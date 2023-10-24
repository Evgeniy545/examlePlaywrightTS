import { test, expect } from '@playwright/test';
import { Analytics } from '../../pages/crm/analytics';
import { NotAuth } from '../../pages/crm/not_auth';

test.use({ storageState: 'storage/storageState1.json' });

test('Check Login', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
  const analytics = new Analytics(page);
  await expect(page).toHaveURL(analytics.URL);
});
