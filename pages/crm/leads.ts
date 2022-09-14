// leads.ts
import { expect, Locator, Page } from '@playwright/test';

export class Leads {
  readonly page: Page;
  readonly URL: string;
  readonly buttonAddLead: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.URL = '/crm/leads';
    this.buttonAddLead = page.locator('data-test=adminLeadCreateNewButton');
           
  }

  async goto() {
    await this.page.goto(this.URL);
  }
  async clickButtonAdd() {
    await this.buttonAddLead.click();
  }


}