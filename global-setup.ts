import { chromium, expect, request } from '@playwright/test';
import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { NotAuth } from './pages/crm/not_auth';




/*async function globalSetup(config: FullConfig) {
  const requestContext = await request.newContext();
  const responce = await requestContext.post('https://6252_contract_termination_way_by_user.tpsg.etpgpb.ru/v1/admin/token', {
   data: { "auth":{"email":"y.dyurchek@etpgpb.ru","password":"y*n@cb9XIxZnWO8h"}},
   ignoreHTTPSErrors: true,
 });
 await requestContext.get(URL + '/crm/not_auth');
// Save signed-in state to 'storageState.json'.
 await requestContext.storageState({ path: 'storageState2.json',});
  /*console.log(await responce.json());
 expect(responce.ok()).toBeTruthy();
 expect(responce.status()).toBe(201);
 const res = await responce.json();
 const ress = res.jwt;
 console.log(ress);*/
 

 //const context = await browser.newContext({ storageState: 'state.json' });



//}

//export default globalSetup;*/
async function globalSetup(config: FullConfig) {
  
  const browser = await chromium.launch();
  //const page = await browser.newPage();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const URL = String(process.env.BASE_URL);
  const LOGIN = String(process.env.LOGIN);
  const PASS = String(process.env.PASS);
  await page.goto(URL + '/crm/not_auth');
  await page.locator('[data-test="adminAuthLogin"]').type(LOGIN);
  await page.locator('input[type="password"]').fill(PASS);
  await page.locator('data-test=adminAuthBtn').click();
  await expect(page).toHaveURL(/.*analytics/);


  // Save signed-in state to 'storageState.json'.

  await page.context().storageState({ path: 'storageState.json' });
  //await browser.close();
  await context.close();



}

export default globalSetup;
