import { test, expect, request } from '@playwright/test';
import { SidebarMenu } from '../../pages/crm/sidebar_menu';
import { Leads } from '../../pages/crm/leads';
import { NotAuth } from '../../pages/crm/not_auth';




test('Check go to page leads', async ({ page }) => {
  await page.goto('/crm');
  const sidebar_menu = new SidebarMenu(page);
  sidebar_menu.clickAnyItem(sidebar_menu.leadsItem);
  const leads = new Leads(page);
  await expect(page).toHaveURL(leads.URL);
  });


  