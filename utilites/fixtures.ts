import { test as base, BrowserContext } from '@playwright/test';

export * from '@playwright/test';

export const test = base.extend<{ etpAdminContext: BrowserContext; seniorManagerContext: BrowserContext; mfcAdminContext: BrowserContext; auditorContext: BrowserContext; eogContext: BrowserContext; regionalHeadContext: BrowserContext; mfcOperatorContext: BrowserContext; operatorContext: BrowserContext; mfcContext: BrowserContext; }>({
  etpAdminContext: async ({ browser }, use) => {
    const etpAdminContext = await browser.newContext({ storageState: `./.auth/storage_etp_admin.json` });
    await etpAdminContext.route('**/mc.yandex.ru/**', route => route.abort());
    await etpAdminContext.route('**/www.google-analytics.com/**', route => route.abort());
    await etpAdminContext.route('**/vk.com/**', route => route.abort());
    await etpAdminContext.route('**/www.googletagmanager.com/**', route => route.abort());
    await use(etpAdminContext);    
    await etpAdminContext.close();
  },
  auditorContext: async ({ browser }, use) => {
    const auditorContext = await browser.newContext({ storageState: `./.auth/storage_auditor.json` });
    await auditorContext.route('**/mc.yandex.ru/**', route => route.abort());
    await auditorContext.route('**/www.google-analytics.com/**', route => route.abort());
    await auditorContext.route('**/vk.com/**', route => route.abort());
    await auditorContext.route('**/www.googletagmanager.com/**', route => route.abort());
    await use(auditorContext);
    await auditorContext.close();
  },
  mfcAdminContext: async ({ browser }, use) => {
    const mfcAdminContext = await browser.newContext({ storageState: `./.auth/storage_mfc_admin.json` });
    await use(mfcAdminContext)
    await mfcAdminContext.close();
  },
  eogContext: async ({ browser }, use) => {
    const eogContext = await browser.newContext({ storageState: `./.auth/storage_eog.json` });
    await use(eogContext)
    await eogContext.close();
  },
  mfcOperatorContext: async ({ browser }, use) => {
    const mfcOperatorContext = await browser.newContext({ storageState: `./.auth/storage_mfc_operator.json` });
    await use(mfcOperatorContext)
    await mfcOperatorContext.close();
  },
  mfcContext: async ({ browser }, use) => {
    const mfcContext = await browser.newContext({ storageState: `./.auth/storage_mfc.json` });
    await use(mfcContext)
    await mfcContext.close();
  },
  operatorContext: async ({ browser }, use) => {
    const operatorContext = await browser.newContext({ storageState: `./.auth/storage_operator.json` });
    await use(operatorContext)
    await operatorContext.close();
  },
  regionalHeadContext: async ({ browser }, use) => {
    const regionalHeadContext = await browser.newContext({ storageState: `./.auth/storage_regional_head.json` });
    await use(regionalHeadContext)
    await regionalHeadContext.close();
  },
  seniorManagerContext: async ({ browser }, use) => {
    const seniorManagerContext = await browser.newContext({ storageState: `./.auth/storage_senior_manager.json` });
    await use(seniorManagerContext)
    await seniorManagerContext.close();
  }
});
