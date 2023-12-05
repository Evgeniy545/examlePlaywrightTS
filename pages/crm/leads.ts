// leads.ts
import { expect, Locator, Page } from '@playwright/test';

export class Leads {
  readonly page: Page;
  readonly buttonAddLead: Locator;
  readonly headerPage: Locator;
  static readonly URL = '/crm/leads';
  

  constructor(page: Page) {
    this.page = page;
    
    this.buttonAddLead = page.locator('data-test=adminLeadCreateNewButton');
    this.headerPage  = page.locator('header > div > div.adminHeader__meta > div', { hasText: 'Заявки' });     
  }

  async goto() {
    await this.page.goto(Leads.URL);
  }
  async clickButtonAdd() {
    await this.buttonAddLead.click();
  }
  

}