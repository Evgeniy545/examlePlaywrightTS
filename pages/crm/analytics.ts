// analytics.ts
import { expect, Locator, Page } from '@playwright/test';

export class Analytics {
  readonly page: Page;
  readonly URL: string;
  readonly analyticsHeader: Locator;
  readonly leadsCampaignTitle: Locator;
  readonly contractsCampaignTitle: Locator;
  readonly usersTitle: Locator;
  readonly sourceTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.URL = '/crm/analytics'
    this.analyticsHeader = page.locator('h1', { hasText: 'Аналитическая справка по заявкам' });
    this.leadsCampaignTitle = page.locator('h3', { hasText: 'Заявочная кампания' });
    this.contractsCampaignTitle = page.locator('h3', { hasText: 'Договорная кампания' });
    this.usersTitle = page.locator('h3', { hasText: 'Пользователи' });
    this.sourceTitle = page.locator('h3', { hasText: 'Источник' });
        
  }

  async goto() {
    await this.page.goto(this.URL);
  }

  async checkFillInputLogin(login: string) {
    
  }

  async checkFillinputPass(pass: string) {
    
  }
  async loginInCRM() {
   
  }

}