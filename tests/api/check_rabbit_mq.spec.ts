import { expect } from '@playwright/test'
import { fixtures as test } from '../../utilites/fixtureApi';
import data2 from '../../data/status_check_docements.json';
import data3 from '../../data/status_pending.json';
import data4 from '../../data/status_documents_given.json';
import data5 from '../../data/status_denied.json';
import data6 from '../../data/status_in_progress.json';
import data7 from '../../data/status_annulled.json';
import data_fl_user from '../../data/fl_user.json';
import { getObjLead } from '../../utilites/leads_json';
import storageEPGUAdmin from '../../.auth/storage_admin_epgu.json'
test.describe.configure({ mode: 'serial' });
test.describe("Проверка очередей в ЕПГУ и в КЦ", () => {
  
  let token: string;
  let leadId: string;
  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))


  test.beforeAll(async ({ API }) => {
    /*const res = await API.postReq('/v1/admin/token',
      { "auth": { "email": "akonovalenko@rnds.pro", "password": "y*n@cb9XIxZnWO8h" } });
    token = (await res.json()).jwt;*/
    token = String(storageEPGUAdmin.cookies[0].value);
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
    await API.putReq('/v1/admin/users/1222390', update_userJson, token);
    const inProgressUpdateStatus = data6;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', inProgressUpdateStatus, token);
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', checkDocUpdateStatus, token);
    const annulledStatus = data7;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', annulledStatus, token);
  });

  test('Проверка мессаджей в очереди Аттачменты статусы "Зарегистрирована", "Проверка комплектности документов"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.attachments', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { attachments_attributes: { kind: string; }; }; }; }) => item.attributes.message.attachments_attributes[0].kind);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['consent_equity_owner', 'gas_flow', 'plan', 'title_documents', 'land', 'passport']));
  });

  test('Проверка мессаджей в очереди КЦ статусы "Зарегистрирована", "Проверка комплектности документов", "Отложена" и "Недостающие документы предоставлены"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.coordinate_center', token);
    console.log((await getResRabMessage.json()));
    const b = JSON.stringify(await getResRabMessage.json());
    expect(b).toMatch('"Статус ЕОГ":"Зарегистрирована"');
    expect(b).toMatch('"Статус ЕОГ":"Проверка комплектности документов"');
    expect(b).toMatch('"Статус ЕОГ":"Отложена"');
    expect(b).toMatch('"Статус ЕОГ":"Недостающие документы предоставлены"');
  });

  test('Проверка мессаджей в очереди ЕПГУ статусы "Зарегистрирована", "Проверка комплектности документов"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; }; }; }) => item.attributes.message.status);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['registered']));
    expect(b).toEqual(expect.arrayContaining(['document_check']));
  });

  test('Проверка мессаджей в очереди ЕПГУ статусы "Отложена", "Недостающие документы предоставлены"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; }; }; }) => item.attributes.message.status);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['pending']));
    expect(b).toEqual(expect.arrayContaining(['documents_given']));
  });

  test('Проверка оргкодов 1001 1007 в мессаджах в очереди ЕПГУ для статусов "Зарегистрирована", "Проверка комплектности документов"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining([ 'document_check 1007', 'registered 1001' ]));
  });
  
  test('Проверка оргкодов 1014 1007 в мессаджах в очереди ЕПГУ для статусов "Отложена", "Недостающие документы предоставлены"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining([ 'pending 1014', 'documents_given 1007' ]));
  });

  test('Проверка оргкодов 1007 1004 в мессаджах в очереди ЕПГУ для статусов "Отказано в заключении договора", "Подготовка ТУ и заключение договора"', async ({ API }) => {
    await delay(3000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining([ 'denied 1004', 'in_progress 1007' ]));
  });
  
  test('Проверка оргкода в мессаджах в очереди ЕПГУ в статусе заявки "Аннулирована"', async ({ API }) => {
    await delay(3000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['annulled 1084']));
  });


})
