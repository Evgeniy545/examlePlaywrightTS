import { test, expect } from '@playwright/test';


test.use({ storageState: '.auth/storage_auditor.json' });
test('test', async ({ page }) => {
  await page.goto('/crm');
});
/*"user_fl": {
    "login": "tpsg.gpb+01@gmail.com",
    "password": "y*n@cb9XIxZnWO8h",
    "regional_head": "user_fl"
  },
  "user_ul": {
    "login": "tpsg.gpb+02@gmail.com",
    "password": "y*n@cb9XIxZnWO8h",
    "regional_head": "user_ul"
  },
  "user_ip": {
    "login": "tpsg.gpb+03@gmail.com",
    "password": "y*n@cb9XIxZnWO8h",
    "regional_head": "user_ip"
  }*/