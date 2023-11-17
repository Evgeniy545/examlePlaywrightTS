import { chromium, expect, request } from '@playwright/test';



export async function getToken(email: string, password: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.post(URL + '/v1/admin/token', {
        data: { "auth": { email, password } },
        ignoreHTTPSErrors: true,

    });
    expect(responce.ok()).toBeTruthy();
    const res = await responce.json();
    return res.jwt;
}

export async function createStorageFile(key: string, token: string) {
    const URL = String(process.env.BASE_URL);
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block' });
    await context.addCookies([{ name: "token", value: token, path: '/', domain: '.etpgpb.ru' }]);
    const page = await context.newPage();
    await page.route('https://mc.yandex.ru/metrika/tag.js', route => route.abort());   
    //page.on('request', request => console.log('>>', request.method(), request.url()));
    //page.on('response', response => console.log('<<', response.status(), response.url()));    
    await page.goto(URL + '/crm');       
    await page.context().storageState({ path: '../.auth/storage_' + key + '.json' });
    await console.log(key);
    await context.close();

}


export async function getLeadId(user_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.post(URL + '/v1/admin/users/' + user_id + '/leads', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    expect(responce.ok()).toBeTruthy();
    const res = await responce.json();
    return res.data.id;
}

export async function updateStatusLead(lead_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.put(URL + '/v1/admin/leads/' + lead_id + '/update_status', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    //console.log(await responce.body);
    expect(responce.ok()).toBeTruthy();
    const res = await responce.json();
    return res;
}
export async function updateUser(user_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.put(URL + '/v1/admin/users/' + user_id, {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    //console.log(responce);
    expect(responce.ok()).toBeTruthy();
    const res = await responce.json();
    return res;
}

export async function createContract(lead_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.post(URL + '/v1/admin/leads/' + lead_id + '/contract', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    return responce;
}
export async function updateContract(lead_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.patch(URL + '/v1/admin/leads/' + lead_id + '/contract', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    return responce;
}

export async function updateStatusContract(lead_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.put(URL + '/v1/admin/leads/' + lead_id + '/contract/update_status', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    return responce;
}

export async function updateDatesContract(lead_id: string, token: string, json: Record<string, any>) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.put(URL + '/v1/admin/leads/' + lead_id + '/contract/update_dates', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    return responce;
}

export async function getListContracts(token: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.get(URL + '/v1/admin/contracts', {
        headers: {
            'Authorization': token,
        },
        ignoreHTTPSErrors: true,

    });
    return responce;
}
export async function getContract(lead_id: string, token: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.get(URL + '/v1/admin/leads/' + lead_id + '/contract', {
        headers: {
            'Authorization': token,
        },
        ignoreHTTPSErrors: true,

    });
    return responce;
}

export async function deleteContract(lead_id: string, token: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.delete(URL + '/v1/admin/leads/' + lead_id + '/contract', {
        headers: {
            'Authorization': token,
        },
        ignoreHTTPSErrors: true,

    });
    return responce;
}

export async function getHistoryContract(lead_id: string, token: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.get(URL + '/v1/admin/leads/' + lead_id + '/contract/history', {
        headers: {
            'Authorization': token,
        },
        ignoreHTTPSErrors: true,

    });
    return responce;
}

