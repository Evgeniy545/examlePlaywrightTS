// leads.ts
import { expect, Locator, Page } from '@playwright/test';

export class Leads {
  readonly page: Page;
  readonly URL: string;
  readonly buttonAddLead: Locator;
  readonly headerPage: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.URL = '/crm/leads';
    this.buttonAddLead = page.locator('data-test=adminLeadCreateNewButton');
    this.headerPage  = page.locator('header > div > div.adminHeader__meta > div', { hasText: 'Заявки' });     
  }

  async goto() {
    await this.page.goto(this.URL);
  }
  async clickButtonAdd() {
    await this.buttonAddLead.click();
  }
  

}