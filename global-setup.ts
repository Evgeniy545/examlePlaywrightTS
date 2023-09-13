import { chromium, expect, request } from '@playwright/test';
import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { NotAuth } from './pages/crm/not_auth';




async function globalSetup(config: FullConfig) {
  const requestContext = await request.newContext();
  const URL = String(process.env.BASE_URL);
  const LOGIN = String(process.env.LOGIN);
  const PASS = String(process.env.PASS);
  const responce = await requestContext.post(URL+'/v1/admin/token', {
   data: { "auth":{"email":LOGIN,"password":PASS}},
   ignoreHTTPSErrors: true,
 });
 const res = await responce.json();
 const ress = res.jwt;
 const browser = await chromium.launch();
 const context = await browser.newContext({ ignoreHTTPSErrors: true });
 await context.addCookies([{name: "token", value: ress, path:'/', domain: '.etpgpb.ru'}]);
 const page = await context.newPage(); 
 await page.goto(URL + '/crm');
 await page.context().storageState({ path: 'storageState2.json' });
 await context.close();


}

//export default globalSetup;*/
/*async function globalSetup(config: FullConfig) {
  
  const browser = await chromium.launch();
  //const page = await browser.newPage();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const URL = String(process.env.BASE_URL);
  const LOGIN = String(process.env.LOGIN);
  const PASS = String(process.env.PASS);
  await page.goto(URL + '/crm/not_auth');
  await page.locator('[data-test="adminAuthLogin"]').type('tpsg.gpb+admin@gmail.com');
  await page.locator('input[type="password"]').fill('y*n@cb9XIxZnWO8h');
  await page.locator('data-test=adminAuthBtn').click();
  await expect(page).toHaveURL(/.*analytics/);


  // Save signed-in state to 'storageState.json'.

  await page.context().storageState({ path: 'storageState.json' });
  //await browser.close();
  await context.close();



}*/

export default globalSetup;
