import { FullConfig } from '@playwright/test';
import { getToken } from '../utilites/helpers';
import { createStorageFile } from '../utilites/helpers';
import * as fs from 'fs';
import data from './data.json';

async function globalSetup(config: FullConfig) {
  for (var key in data) {
    //console.log(key);   
    try {
      if (fs.existsSync('../.auth/storage_' + key + '.json')) {
          //file exists
      }
      else{
        const token = await getToken(String(data[key].login), String(data[key].password))
        await createStorageFile(key, token);
      }
  } catch (err) {
    console.log(err);
  }
    
  }


}


export default globalSetup;