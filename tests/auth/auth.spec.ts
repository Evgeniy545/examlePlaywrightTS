import { test, expect } from '@playwright/test';
import { Leads} from '../../pages/crm/leads';
import { NotAuth } from '../../pages/crm/not_auth';
import data_roles from '../../configs/data.json' 

test.use({ storageState: { cookies: [], origins: [] } });

test('Проверка авторизации под Администратором', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin(data_roles['etp_admin'].login);
  await notAuth.checkFillinputPass(data_roles['etp_admin'].password);
  await notAuth.loginInCRM();
  const leads = new Leads(page);
  await expect(page).toHaveURL(leads.URL);
});
