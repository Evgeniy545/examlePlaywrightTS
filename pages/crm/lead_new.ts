// lead_new.ts
import { expect, Locator, Page } from '@playwright/test';

export class LeadsNew {
  readonly page: Page;
  readonly URL: string;
  readonly buttonBack: Locator;
  readonly buttonContinue: Locator;
  readonly headerNewLead: Locator;
  readonly labelInputAplicant: Locator;

  constructor(page: Page) {
    this.page = page;
    this.URL = '/crm/leads/new';
    this.buttonBack = page.locator('href=/crm/leads');
    this.buttonContinue = page.locator('button', {hasText: 'Продолжить'});
    this.headerNewLead = page.locator('h1', { hasText: 'Создание новой заявки' });
    this.labelInputAplicant = page.locator('span', { hasText: 'Наименование организации или ФИО' });

  }

  async goto() {
    await this.page.goto(this.URL);
  }
  


}