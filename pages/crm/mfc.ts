import { Page } from '@playwright/test';

export class MfcPage {
  readonly page: Page;
  readonly URL: string = '/crm/mfc';

  constructor (page: Page) {
    this.page = page;
  }

  async goto () {
    await this.page.goto(this.URL);
  }
}
