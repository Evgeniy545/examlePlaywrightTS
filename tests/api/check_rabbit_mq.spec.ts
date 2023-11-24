import { expect } from '@playwright/test'
import { fixtures as test } from '../../utilites/fixtureApi';
import data1 from '../../data/Lead.json';
import { createContract, getLeadId, getRabbitMessages, updateStatusLead, updateUser } from '../../utilites/helpers';
import data2 from '../../data/status_check_docements.json';
import data3 from '../../data/status_pending.json';
import data4 from '../../data/status_documents_given.json';
import data5 from '../../data/status_denied.json';
import data6 from '../../data/status_in_progress.json';
import data7 from '../../data/status_annulled.json';
import data_body_contract from '../../data/body_contract.json';
import data_storage_admin_epgu from '../../.auth/storage_admin_epgu.json';
import data_fl_user from '../../data/fl_user.json';
import { getObjLead } from '../../utilites/leads_json';

async function creatLeadConten() {
  const token = String(data_storage_admin_epgu.cookies[0].value)
  const json = await getObjLead();
  const lead_id = await getLeadId(token, '1222390', json);
  return lead_id;
}

test.describe("Проверка очередей в ЕПГУ и в КЦ", () => {
  let token: string;
  let leadId: string;


  test.beforeAll(async ({ API }) => {
    const res = await API.postReq('/v1/admin/token',
      { "auth": { "email": "akonovalenko@rnds.pro", "password": "y*n@cb9XIxZnWO8h" } });
    token = (await res.json()).jwt;
    console.log(token);
    const json = await getObjLead();
    const resLead = await API.postReq('/v1/admin/users/1222390/leads', json, token);
    leadId = (await resLead.json()).data.id;
    console.log(leadId);
    const checkDocUpdateStatus = data2;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', checkDocUpdateStatus, token);
    const pendingUpdateStatus = data3;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', pendingUpdateStatus, token);
    const documentsGivUpdateStatus = data4;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', documentsGivUpdateStatus, token);
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', checkDocUpdateStatus, token);
    const deniedUpdateStatus = data5;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', deniedUpdateStatus, token);
    const update_userJson = data_fl_user;
    await API.putReq('/v1/admin/users/1222390', data_fl_user, token);
    const inProgressUpdateStatus = data6;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', inProgressUpdateStatus, token);
  });

  test('Проверка мессаджей в очереди Аттачменты статусы "Зарегистрирована", "Проверка комплектности документов"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.attachments', token);
    const b = (await getResRabMessage.json()).data.map((item: any) => item.attributes.message.attachments_attributes[0].kind);
    let number: number = Number(leadId);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['consent_equity_owner', 'gas_flow', 'plan', 'title_documents', 'land', 'passport']));
  });

  test('Проверка мессаджей в очереди КЦ статусы "Зарегистрирована", "Проверка комплектности документов", "Отложена" и "Недостающие документы предоставлены"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.coordinate_center', token);
    console.log((await getResRabMessage.json()));
    const b = JSON.stringify(await getResRabMessage.json());
    expect(b).toMatch('\"Статус ЕОГ\":\"Зарегистрирована\"');
    expect(b).toMatch('\"Статус ЕОГ\":\"Проверка комплектности документов\"');
    expect(b).toMatch('\"Статус ЕОГ\":\"Отложена\"');
    expect(b).toMatch('\"Статус ЕОГ\":\"Недостающие документы предоставлены\"');
  });

  test('Проверка мессаджей в очереди ЕПГУ статусы "Зарегистрирована", "Проверка комплектности документов"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: any) => item.attributes.message.status);
    let number: number = Number(leadId);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['registered']));
    expect(b).toEqual(expect.arrayContaining(['document_check']));
  });

  test('Проверка мессаджей в очереди ЕПГУ статусы "Отложена", "Недостающие документы предоставлены"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: any) => item.attributes.message.status);
    let number: number = Number(leadId);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['pending']));
    expect(b).toEqual(expect.arrayContaining(['documents_given']));
  });

  test('Проверка оргкодов 1001 1007 в мессаджах в очереди ЕПГУ для статусов "Зарегистрирована", "Проверка комплектности документов"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: any) => item.attributes.message.status+" "+item.attributes.message.org_code);
    let number: number = Number(leadId);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining([ 'document_check 1007', 'registered 1001' ]));
  });
  
  test('Проверка оргкодов 1014 1007 в мессаджах в очереди ЕПГУ для статусов "Отложена", "Недостающие документы предоставлены"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: any) => item.attributes.message.status+" "+item.attributes.message.org_code);
    let number: number = Number(leadId);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining([ 'pending 1014', 'documents_given 1007' ]));
  });

  test('Проверка оргкодов 1007 1004 в мессаджах в очереди ЕПГУ для статусов "Отказано в заключении договора", "Подготовка ТУ и заключение договора"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: any) => item.attributes.message.status+" "+item.attributes.message.org_code);
    let number: number = Number(leadId);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining([ 'denied 1004', 'in_progress 1007' ]));
  });
})


/*


test('Проверка мессаджей в очереди статус "Аннулирована"', async ({}) => {
  const token = String(data_storage_admin_epgu.cookies[0].value);
  //console.log(token);
  const json = data1;
  const lead_id = await getLeadId('1222390', token, json);
  console.log(lead_id);
  const checkDocUpdateStatus = data2;
  await updateStatusLead(lead_id, token, checkDocUpdateStatus);
  const pendingUpdateStatus = data3;
  await updateStatusLead(lead_id, token, pendingUpdateStatus);
  const annulledStatus = data7;
  await updateStatusLead(lead_id, token, annulledStatus);
  });

  test('Проверка мессаджей в очереди статус "Реализация мероприятий по договору"', async ({}) => {
    const token = String(data_storage_admin_epgu.cookies[0].value);
    //console.log(token);
    const json = data1;
    const lead_id = await getLeadId('1222390', token, json);
    console.log(lead_id);
    const checkDocUpdateStatus = data2;
    await updateStatusLead(lead_id, token, checkDocUpdateStatus);
    const update_userJson = data_fl_user;
    await updateUser('1222390', token, update_userJson);
    const inProgressUpdateStatus = data6;
    await updateStatusLead(lead_id, token, inProgressUpdateStatus);
    const body_contract = data_body_contract;
    const contract_id = await createContract(lead_id, token, body_contract);
    console.log(contract_id); 
  });*/