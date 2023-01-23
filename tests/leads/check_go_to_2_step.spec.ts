import { test, expect } from '@playwright/test';
import { Leads } from '../../pages/crm/leads';
import { LeadsNew } from '../../pages/crm/lead_new';
import { NotAuth } from '../../pages/crm/not_auth';
import { SidebarMenu } from '../../pages/crm/sidebar_menu';


/*test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
});*/

  test('Check go to next step"+" lead', async ({ page }) => {
    const lead_new = new LeadsNew(page);
    await lead_new.gotoUrlUser('734576');
    await lead_new.fillInputBranchGro();
    await lead_new.buttonNext.click();
    await expect(lead_new.headerBlockWho).toBeVisible;

    });



