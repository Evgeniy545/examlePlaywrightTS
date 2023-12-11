import { chromium, expect, request } from '@playwright/test';



export async function getToken(email: string, password: string) {
    const requestContext = await request.newContext();
    const responce = await requestContext.post(process.env.BASE_URL + '/v1/admin/token', {
        data: { "auth": { email, password } },
        ignoreHTTPSErrors: true,

    });
    expect(responce.ok()).toBeTruthy();
    const res = await responce.json();
    return res.jwt;
}

export async function createStorageFile(key: string, token: string) {
    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block' });
    await context.addCookies([{ name: "token", value: token, path: '/', domain: '.etpgpb.ru' }]);
    const page = await context.newPage();
    await context.route('**/mc.yandex.ru/**', route => route.abort());
    await context.route('**/www.google-analytics.com/**', route => route.abort());
    await context.route('**/vk.com/**', route => route.abort());
    await context.route('**/www.googletagmanager.com/**', route => route.abort());
    //page.on('request', request => console.log('>>', request.method(), request.url()));
    //page.on('response', response => console.log('<<', response.status(), response.url()));    
    await page.goto(process.env.BASE_URL + '/crm');
    await page.context().storageState({ path: './.auth/storage_' + key + '.json' }); //если запускаем из IDE, path смотрит отнсоительно корня проекта(если запускаем командой, то path относительно файла конфига)  
    await console.log(key);
    await context.close();

}


export async function getLeadId(token: string, user_id: string, json: Record<string, any>) {
    const requestContext = await request.newContext();
    const responce = await requestContext.post(process.env.BASE_URL + '/v1/admin/users/' + user_id + '/leads', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    console.log(await responce.json());
    expect(responce.ok()).toBeTruthy();
    const res = await responce.json();

    return res.data.id;
}

export async function updateStatusLead(token: string, lead_id: string, json: Record<string, any>) {
    const requestContext = await request.newContext();
    const responce = await requestContext.put(process.env.BASE_URL + '/v1/admin/leads/' + lead_id + '/update_status', {
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
    const requestContext = await request.newContext();
    const responce = await requestContext.post(process.env.BASE_URL + '/v1/admin/leads/' + lead_id + '/contract', {
        headers: {
            'Authorization': token,
        },
        data: json,
        ignoreHTTPSErrors: true,

    });
    return responce;
}
export async function updateContract(lead_id: string, token: string, json: Record<string, any>) {
    const requestContext = await request.newContext();
    const responce = await requestContext.patch(process.env.BASE_URL + '/v1/admin/leads/' + lead_id + '/contract', {
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
    process.env.BASE_URL;
    console.log(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.get(process.env.BASE_URL + '/v1/admin/contracts', {
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

export async function getRabbitMessages(token: string, messageable_type?: string, messagible_id?: string, queue_name?: string) {
    const URL = String(process.env.BASE_URL);
    const requestContext = await request.newContext();
    const responce = await requestContext.get(URL + '/v1/admin/rabbit_messages?messageable_type=' + messageable_type + '&messageable_id=' + messagible_id + '&queue_name=' + queue_name, {
        headers: {
            'Authorization': token,
        },
        ignoreHTTPSErrors: true,

    });
    console.log(responce.url());
    const b = await responce.json();
    console.log(b);
    return b;
}

