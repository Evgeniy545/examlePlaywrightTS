/*import { expect } from '@playwright/test';
import { MfcPage } from '../../pages/crm/mfc';
import { test } from '../../utilites/fixtures'

test.describe("Веменно пропускаем набор ", () => {
  test.skip();
test('Заголовок страницы МФЦ - МФЦ', async ({ etpAdminContext }) => {
  const wrapper = new MfcPage(await etpAdminContext.newPage());
  await wrapper.goto();
  const titleContainer = wrapper.page.locator('.pageTable__header')
  expect(await titleContainer.textContent()).toContain('МФЦ')
});

test('Заголовок страницы МФЦ - МФЦ1', async ({ mfcAdminContext }) => {
  const wrapper = new MfcPage(await mfcAdminContext.newPage());
  await wrapper.goto();
  const titleContainer = wrapper.page.locator('.pageTable__header')
  expect(await titleContainer.textContent()).toContain('МФЦ')
});
});*/