import { test, expect } from '@playwright/test';
import { Leads } from '../../pages/crm/leads';
import { LeadsNew } from '../../pages/crm/lead_new';
import { NotAuth } from '../../pages/crm/not_auth';
import { SidebarMenu } from '../../pages/crm/sidebar_menu';



test('Check clear fieldGro' , async ({ page }) => {
  const lead_new = new LeadsNew(page);
  await lead_new.gotoUrlUser('734576');
  await expect(lead_new.inputNameGro).toHaveValue('АО «Газпром газораспределение Псков»');
  //expect(lead_new.inputNameGro).not.toBeEmpty();
  //const value = await lead_new.returnValueInput();
  //console.log(value);
  await lead_new.cleanInputNameGro();
  await expect(lead_new.inputNameGro).toBeEmpty;
  console.log(await lead_new.returnValueInput());
  });
