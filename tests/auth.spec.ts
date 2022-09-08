import { test, expect } from '@playwright/test';
import { exit } from 'process';
import { NotAuth } from '../pages/crm/not_auth';

test('Check Login', async ({ page }) => {
  const notAuth = new NotAuth(page);
  await notAuth.goto();
  await notAuth.checkFillInputLogin('y.dyurchek@etpgpb.ru');
  await notAuth.checkFillinputPass('y*n@cb9XIxZnWO8h');
  await notAuth.loginInCRM();
  exit;
  });
