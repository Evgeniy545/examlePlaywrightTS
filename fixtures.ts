import { test as base, BrowserContext } from '@playwright/test';

export * from '@playwright/test';
export const test = base.extend<{ etpAdminContext: BrowserContext; }>({
  etpAdminContext: async ({ browser }, use) => {
    const etpAdminContext = await browser.newContext({ storageState: `playwright/.auth/storage_etp_admin.json` });
    await use(etpAdminContext)
  }
});
