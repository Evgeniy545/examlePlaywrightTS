// not_auth.ts
import { expect, Locator, Page } from '@playwright/test';

export class NotAuth {
  readonly page: Page;
  readonly notAuthHeader: Locator;
  readonly notAuthFormTitle: Locator;
  readonly inputLogin: Locator;
  readonly inputPass: Locator;
  readonly buttonSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notAuthHeader = page.locator('h2', { hasText: 'Административная консоль портала Единого оператора газификации' });
    this.notAuthFormTitle = page.locator('div > .notAuth__formTitle');
    this.inputLogin = page.locator('data-test=adminAuthLogin');
    this.inputPass = page.locator('data-test=adminAuthPassword');
    this.buttonSubmit = page.locator('data-test=adminAuthBtn');
  }

  async goto() {
    await this.page.goto('/crm/not_auth');
  }

  async checkFillInputLogin(login: string) {
    await this.inputLogin.focus();
    await this.inputLogin.type(login);
    await expect(this.inputLogin).toHaveValue(login);
  }

  async checkFillinputPass(pass: string) {
    await this.inputPass.fill(pass)
    await expect(this.inputPass).toHaveValue(pass);
  }
  async loginInCRM() {
    await expect(this.buttonSubmit).toHaveText('Войти');
    await this.buttonSubmit.click();
  }

}