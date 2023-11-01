import { expect } from '@playwright/test';
import * as fs from 'fs';
import data from '../../.auth/data.json';
import { test } from '@playwright/test'
import { getToken } from '../../utilites/helpers';
import data1 from '../../data/Body_lead_dogas.json';
import { getLeadId, updateStatusLead } from '../../utilites/helpers';
import data2 from '../../data/status_check_docements.json';
import data3 from '../../data/status_pending.json';
import data4 from '../../data/status_documents_given.json';
import data5 from '../../data/status_denied.json';
import data6 from '../../data/status_in_progress.json';

test('Проверка мессаджа в очереди после регистрации заявки', async ({ page }) => {
  var key = 'etp_admin';
  const token = await getToken(String(data[key].login), String(data[key].password));
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
  await updateStatusLead(lead_id, token, checkDocUpdateStatus);
  const deniedUpdateStatus = data5;
  await updateStatusLead(lead_id, token, deniedUpdateStatus);
  const inProgressUpdateStatus = data6;
  await updateStatusLead(lead_id, token, inProgressUpdateStatus);
});

