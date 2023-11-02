import { test, expect } from '@playwright/test';
import { LeadsNew } from '../../pages/crm/lead_new';


/*test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
});*/

test('Check branch validate "+" lead', async ({ page }) => {
  const lead_new = new LeadsNew(page);
  await lead_new.gotoUrlUser('734576');
  await lead_new.buttonNext.click();
  await expect(lead_new.inputError).toBeVisible();
  });


  test('Check go to next step"+" lead', async ({ page }) => {
    const lead_new = new LeadsNew(page);
    await lead_new.gotoUrlUser('734576');
    await lead_new.fillInputBranchGro();
    await lead_new.buttonNext.click();

    });



