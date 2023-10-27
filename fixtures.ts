import { test as base, BrowserContext } from '@playwright/test';

export * from '@playwright/test';
export const test = base.extend<{ etpAdminContext: BrowserContext; mfcAdminContext: BrowserContext; }>({
  etpAdminContext: async ({ browser }, use) => {
    const etpAdminContext = await browser.newContext({ storageState: `./.auth/storage_etp_admin.json` });
    await use(etpAdminContext)
    etpAdminContext.close
    browser.close
  },
  mfcAdminContext: async ({ browser }, use) => {
    const mfcAdminContext = await browser.newContext({ storageState: `./.auth/storage_mfc_admin.json` });
    await use(mfcAdminContext)
    mfcAdminContext.close
    browser.close
  }
});
