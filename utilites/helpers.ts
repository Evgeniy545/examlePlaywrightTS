import { chromium, expect, request } from '@playwright/test';
import * as fs from 'fs';
import { constants } from 'fs';


export async function getToken(email: string, password: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.post(URL + '/v1/admin/token', {
        data: { "auth": { email, password } },
        ignoreHTTPSErrors: true,

    });
    const res = await responce.json();
    return res.jwt;
}

export async function createStorageFile(key: string, token: string) {
    const URL = String(process.env.BASE_URL);
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    await context.addCookies([{ name: "token", value: token, path: '/', domain: '.etpgpb.ru' }]);
    const page = await context.newPage();
    await page.goto(URL + '/crm');
    await page.context().storageState({ path: '.auth/storage_' + key + '.json' });
    await context.close();
}


export async function getLeadId(user_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.post(URL + '/v1/admin/users/'+user_id+'/leads', {
        headers:{
            'Authorization': token,  
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    const res = await responce.json();
    //console.log(res);
    return res.data.id;
}

export async function updateStatusLead(lead_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.put(URL + '/v1/admin/leads/'+lead_id+'/update_status', {
        headers:{
            'Authorization': token,  
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    const res = await responce.json();
    console.log(res);
    return res;
}