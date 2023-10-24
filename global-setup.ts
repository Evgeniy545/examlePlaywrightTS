import { chromium, expect, request } from '@playwright/test';
import { FullConfig } from '@playwright/test';
import { getToken } from './utilites/helpers';
import { createStorageFile } from './utilites/helpers';
import { NotAuth } from './pages/crm/not_auth';
import * as fs from 'fs';
import data from './.auth/data.json';

async function globalSetup(config: FullConfig) {
  for (var key in data) {
    //console.log(key);   
    const token = await getToken(String(data[key].login), String(data[key].password))
    await createStorageFile(key, token);
  }


}


export default globalSetup;