import { test, expect } from '@playwright/test';
import { Leads} from '../../pages/crm/leads';
import { NotAuth } from '../../pages/crm/not_auth';
import data_roles from '../../configs/data.json' 

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async({context}) =>{
  await context.route('**/mc.yandex.ru/**', route => route.abort());
  await context.route('**/www.google-analytics.com/**', route => route.abort());
  await context.route('**/vk.com/**', route => route.abort());
  await context.route('**/www.googletagmanager.com/**', route => route.abort());
});

test('Проверка авторизации под Администратором', async ({ page }) => {
  const notAuth = new NotAuth(page);
  page.on('request', request => console.log('>>', request.method(), request.url()));
  page.on('response', response => console.log('<<', response.status(), response.url()));
  await notAuth.goto(); 
  await notAuth.checkFillInputLogin(data_roles['etp_admin'].login);
  await notAuth.checkFillinputPass(data_roles['etp_admin'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под Администратором ГРО', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['senior_manager'].login);
  await notAuth.checkFillinputPass(data_roles['senior_manager'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под Оператором', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['operator'].login);
  await notAuth.checkFillinputPass(data_roles['operator'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под ЕОГ', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['eog'].login);
  await notAuth.checkFillinputPass(data_roles['eog'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под Аудитором', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['auditor'].login);
  await notAuth.checkFillinputPass(data_roles['auditor'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под МФЦ', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['mfc'].login);
  await notAuth.checkFillinputPass(data_roles['mfc'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под АРШ', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['regional_head'].login);
  await notAuth.checkFillinputPass(data_roles['regional_head'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под Администратором МФЦ', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['mfc_admin'].login);
  await notAuth.checkFillinputPass(data_roles['mfc_admin'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});

test('Проверка авторизации под Оператором МФЦ', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['mfc_operator'].login);
  await notAuth.checkFillinputPass(data_roles['mfc_operator'].password);
  await notAuth.loginInCRM();
  await page.waitForURL(Leads.URL);
  await expect(page).toHaveURL(Leads.URL);
});
