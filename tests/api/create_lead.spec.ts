import { expect } from '@playwright/test';
import * as fs from 'fs';
import data from '../../.auth/data.json';
import { test } from '@playwright/test'
import { getToken } from '../../utilites/helpers';
import data1 from '../../data/Body_lead_dogas.json';
import { getLeadId, updateStatusLead } from '../../utilites/helpers';
import data2 from '../../data/status_lead_update.json';

test('Создание заявки', async ({ page }) => {
    var key='etp_admin';
    const token = await getToken(String(data[key].login), String(data[key].password))
    //console.log(token);
    const json = data1;
    const lead_id = await getLeadId('1222390', token, json);
    console.log(lead_id);
    const jsonUpdateStatus = data2; 
    await updateStatusLead(lead_id, token, jsonUpdateStatus); 

  });