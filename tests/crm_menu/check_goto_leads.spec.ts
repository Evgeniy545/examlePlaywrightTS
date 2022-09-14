import { test, expect, request } from '@playwright/test';
import { SidebarMenu } from '../../pages/crm/sidebar_menu';
import { Leads } from '../../pages/crm/leads';
import { NotAuth } from '../../pages/crm/not_auth';



test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
});

test('Check go to page leads', async ({ page }) => {
  const sidebar_menu = new SidebarMenu(page);
  sidebar_menu.clickAnyItem(sidebar_menu.leadsItem);
  const leads = new Leads(page);
  await expect(page).toHaveURL(leads.URL);
  });


  