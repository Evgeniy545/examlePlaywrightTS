/*import { test, expect } from '@playwright/test';
import { Leads } from '../../pages/crm/leads';
import { LeadsNew } from '../../pages/crm/lead_new';
import { SidebarMenu } from '../../pages/crm/sidebar_menu';


/*test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
});*/
/*
test.describe("Веменно пропускаем набор ", () => {
  test.skip();  
test('Check button "+" lead', async ({ page }) => {
  await page.goto('/crm');
  const sidebar_menu = new SidebarMenu(page);
  await page.goto('/crm');
  //sidebar_menu.goto();
  sidebar_menu.clickAnyItem(sidebar_menu.leadsItem);
  const leads = new Leads(page);
  await leads.clickButtonAdd();
  const leads_new = new LeadsNew(page);
  await expect(page).toHaveURL(leads_new.URL);
  });
});*/