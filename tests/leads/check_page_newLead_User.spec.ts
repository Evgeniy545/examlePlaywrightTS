import { test, expect } from '@playwright/test';
import { LeadsNew } from '../../pages/crm/lead_new';




test('Check clear fieldGro' , async ({ page }) => {
  const lead_new = new LeadsNew(page);
  await lead_new.gotoUrlUser('734576');
  await expect(lead_new.inputNameGro).toHaveValue('АО «Газпром газораспределение Псков»');
  //expect(lead_new.inputNameGro).not.toBeEmpty();
  //const value = await lead_new.returnValueInput();
  //console.log(value);
  await lead_new.cleanInputNameGro();
  await expect( await lead_new.inputNameGro).toBeEmpty;
  console.log(await lead_new.returnValueInput());
  });
