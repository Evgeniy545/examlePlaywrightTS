import { expect } from '@playwright/test'
import { fixtures as test } from '../../utilites/fixtureApi';
import data2 from '../../data/status_check_docements.json';
import bodyContractData  from '../../data/body_contract.json';
import bodyAttachContract from '../../data/body_attach_contract.json';
import bodyAttachEcp from '../../data/body_attach_ecp.json';
import bodyStatusOnAppSign from '../../data/status_on_app_sign.json';
import data6 from '../../data/status_in_progress.json';
import bodyUpContr from '../../data/body_update_contract.json';
import bodyStatusCurrent from '../../data/status_contract_current.json';
import data_fl_user from '../../data/fl_user.json';
import { getObjLead } from '../../utilites/leads_json';
import bodyStatusImpl from '../../data/status_lead_implementation.json';
import bodyStatusConn from '../../data/status_lead_connection.json';
import bodyStatusGasStart from '../../data/status_lead_gas_start.json';
import bodyActiveTO from '../../data/body_active_type_to.json'
import bodyActivePG from '../../data/body_active_type_pg.json'
import bodyActiveDatePG from '../../data/body_active_type_datepg.json'
import bodyActiveActConn from '../../data/body_active_type_actcon.json'
import bodyStatusFinished from '../../data/status_finished.json'
import storageEPGUAdmin from '../../.auth/storage_admin_epgu.json'


test.describe("Проверка очередей в ЕПГУ и в КЦ для статусов после Подготовка ТУ и заключение договора", () => {
  let token: string;
  let leadId: string;
  const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))
  test.describe.configure({mode:"serial"});
   

  test.beforeAll(async ({ API }) => {
    /*const res = await API.postReq('/v1/admin/token',
      { "auth": { "email": "akonovalenko@rnds.pro", "password": "y*n@cb9XIxZnWO8h" } });*/
    token = String(storageEPGUAdmin.cookies[0].value);
    console.log(token);
    const json = await getObjLead();
    const resLead = await API.postReq('/v1/admin/users/1222390/leads', json, token);
    leadId = (await resLead.json()).data.id;
    console.log(leadId);
    const checkDocUpdateStatus = data2;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', checkDocUpdateStatus, token);
    const update_userJson = data_fl_user;
    await API.putReq('/v1/admin/users/1222390', update_userJson, token);
    const inProgressUpdateStatus = data6;
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', inProgressUpdateStatus, token);
    // Создаем договор и проводим по всем статусам до действующий
    await API.postReq('/v1/admin/leads/' + leadId + '/contract', bodyContractData, token);
    await API.postReq('/v1/admin/leads/' + leadId + '/contract/attachments', bodyAttachContract, token);
    await API.postReq('/v1/admin/leads/' + leadId + '/contract/attachments', bodyAttachEcp, token);
    await API.patchReq('/v1/admin/leads/' + leadId + '/contract/update_status', bodyStatusOnAppSign, token);
    await API.patchReq('/v1/admin/leads/' + leadId + '/contract', bodyUpContr, token);
    await API.patchReq('/v1/admin/leads/' + leadId + '/contract/update_status', bodyStatusCurrent, token);
    // Перевод заявки в последующие статусы
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', bodyStatusImpl, token);
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', bodyStatusConn, token);
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', bodyStatusGasStart, token);
    // Добавление мероприятий по заявке
    await API.postReq('/v1/admin/leads/' + leadId + '/activities', bodyActiveTO, token);
    await API.postReq('/v1/admin/leads/' + leadId + '/activities', bodyActivePG, token);
    await API.postReq('/v1/admin/leads/' + leadId + '/activities', bodyActiveDatePG, token);
    await API.postReq('/v1/admin/leads/' + leadId + '/activities', bodyActiveActConn, token);
    // Перевод заявки в статус Завершена
    await API.putReq('/v1/admin/leads/' + leadId + '/update_status', bodyStatusFinished, token);
  });
  
  test('(1)Проверка мессаджей в КЦ для статусов заявки "Выполнено подключение (Пуск газа)", "Завершена"', async ({ API }) => {
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.coordinate_center', token);
    const b = JSON.stringify(await getResRabMessage.json());
    expect(b).toMatch('"Статус ЕОГ":"Завершена"');
    expect(b).toMatch('"Статус ЕОГ":"Выполнено подключение (Пуск газа)"');
    expect(b).toMatch('"Статус ЕОГ":"Выполнение фактического присоединения"');
    expect(b).toMatch('"Статус ЕОГ":"Реализация мероприятия по договору"');
  });

  test('(2)Проверка мессаджей и оргкодов в ЕПГУ для статусов контракта "Подготовка оферты", "Подписание заявителем"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['in_progress 1019', 'in_progress 1107']));
  });

  test('(3)Проверка мессаджей в ЕПГУ для статусов заявки "Реализация мероприятий по договору", "Выполнение фактического присоединения"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['implementation 1007', 'connection 1007']));
  });

  

  test('(4)Проверка мессаджей в ЕПГУ для статусов заявки "Выполнено подключение (Пуск газа)"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['gas_start 1007']));
  });


  test('(5)Проверка мессаджей в ЕПГУ для статуса заявки "Завершена"', async ({ API }) => {
    await delay(2000);
    const getResRabMessage = await API.getReq('/v1/admin/rabbit_messages?messageable_type=Lead&messageable_id=' + leadId + '&queue_name=leads.epgu', token);
    const b = (await getResRabMessage.json()).data.map((item: { attributes: { message: { status: string; org_code: string; }; }; }) => item.attributes.message.status+" "+item.attributes.message.org_code);
    console.log(b);
    expect(b).toEqual(expect.arrayContaining(['gas_start 1007', 'finished 1003']));
  });

})


