// sidebar_menu.ts
import { expect, Locator, Page } from '@playwright/test';

export class SidebarMenu {
  readonly page: Page;
  readonly URL: string;
  readonly analyticsItem: Locator;
  readonly leadsItem: Locator;
  readonly leadsMangementItem: Locator;
  readonly applicantsItem: Locator;
  readonly usersItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.URL = '/crm/profile';
    this.analyticsItem = page.locator('span', { hasText: 'Аналитическая справка' });
    this.leadsItem = page.locator('span', { hasText: 'Заявки' });
    this.leadsMangementItem = page.locator('span', { hasText: 'Управление заявками' });
    this.applicantsItem = page.locator('span', { hasText: 'Заявители' });
    this.usersItem = page.locator('span', { hasText: 'Пользователи' });
        
  }
  

  async goto() {
    this.page.goto(this.URL);
    
  }
  
  async clickAnyItem(locator: Locator) {
    locator.click();
  }

  async close() {
    this.page.close();
    
  }
  
}