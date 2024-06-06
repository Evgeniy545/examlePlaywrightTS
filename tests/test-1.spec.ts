import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('form').getByRole('img').click();
  getByRole('heading', { name: 'Заполните Кадастровый номер' });
  getByPlaceholder('Кадастровый номер земельного участка');
  locator('#gas_object_address_cadastral_home_number')
});