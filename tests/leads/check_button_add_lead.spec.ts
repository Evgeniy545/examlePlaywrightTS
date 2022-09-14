import { test, expect } from '@playwright/test';
import { Leads } from '../../pages/crm/leads';
import { LeadsNew } from '../../pages/crm/lead_new';
import { NotAuth } from '../../pages/crm/not_auth';
import { SidebarMenu } from '../../pages/crm/sidebar_menu';

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
});

test('Check button "+" lead', async ({ page }) => {
  const sidebar_menu = new SidebarMenu(page);
  sidebar_menu.clickAnyItem(sidebar_menu.leadsItem);
  const leads = new Leads(page);
  await leads.clickButtonAdd();
  const leads_new = new LeadsNew(page);
  await expect(page).toHaveURL(leads_new.URL);
  });
