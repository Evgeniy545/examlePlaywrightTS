import { FullConfig } from '@playwright/test';
import { getToken } from '../utilites/helpers';
import { createStorageFile } from '../utilites/helpers';
import * as fs from 'fs';
import data from './data.json';

async function globalSetup(config: FullConfig) {
  const roles = Object.keys(data)
  for (const role of roles) {
    //console.log(role);   
    try {
      if (await fs.existsSync('../.auth/storage_' + role + '.json')) {
        //file exists
      } else {
        const token = await getToken(String(data[role].login), String(data[role].password))
        await createStorageFile(role, token);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export default globalSetup;
