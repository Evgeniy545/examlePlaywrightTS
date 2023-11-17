import { test } from '@playwright/test'
import data1 from '../../data/Body_lead_dogas.json';
import { createContract, getLeadId, updateStatusLead, updateUser } from '../../utilites/helpers';
import data2 from '../../data/status_check_docements.json';
import data3 from '../../data/status_pending.json';
import data4 from '../../data/status_documents_given.json';
import data5 from '../../data/status_denied.json';
import data6 from '../../data/status_in_progress.json';
import data7 from '../../data/status_annulled.json';
import data_body_contract from '../../data/body_contract.json';
import data_storage_admin from '../../.auth/storage_etp_admin.json'; 
import data_fl_user from '../../data/fl_user.json';

test('Проверка мессаджей в очереди статусы "Зарегистрирована" и "Проверка комплктности документов"', async ({}) => {
  const token = String(data_storage_admin.cookies[0].value);
  //console.log(token);
  const json = data1;
  const lead_id = await getLeadId('1222390', token, json);
  console.log(lead_id);
  const checkDocUpdateStatus = data2;
  await updateStatusLead(lead_id, token, checkDocUpdateStatus);
  });

test('Проверка мессаджей в очереди статус "Отложена" и "Недостающие докуметы предоставлены"', async ({}) => {
  const token = String(data_storage_admin.cookies[0].value);
  //console.log(token);
  const json = data1;
  const lead_id = await getLeadId('1222390', token, json);
  console.log(lead_id);
  const checkDocUpdateStatus = data2;
  await updateStatusLead(lead_id, token, checkDocUpdateStatus);
  const pendingUpdateStatus = data3;
  await updateStatusLead(lead_id, token, pendingUpdateStatus);
  const documentsGivUpdateStatus = data4;
  await updateStatusLead(lead_id, token, documentsGivUpdateStatus);
});

test('Проверка мессаджей в очереди статус "Отказано в заключении договора"', async ({}) => {
  const token = String(data_storage_admin.cookies[0].value);
  //console.log(token);
  const json = data1;
  const lead_id = await getLeadId('1222390', token, json);
  console.log(lead_id);
  const checkDocUpdateStatus = data2;
  await updateStatusLead(lead_id, token, checkDocUpdateStatus);
  const deniedUpdateStatus = data5;
  await updateStatusLead(lead_id, token, deniedUpdateStatus);
});

test('Проверка мессаджей в очереди статус "Подготовка ТУ и заключение договора"', async ({}) => {
  const token = String(data_storage_admin.cookies[0].value);
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
});

test('Проверка мессаджей в очереди статус "Аннулирована"', async ({}) => {
  const token = String(data_storage_admin.cookies[0].value);
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
    const token = String(data_storage_admin.cookies[0].value);
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
  });

