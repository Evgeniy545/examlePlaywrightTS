import { LeadsNew } from '../../../pages/crm/lead_new';
import { test } from '../../../utilites/fixtures';
import { expect } from '@playwright/test';

test.describe('Проверка элементов шестого шага(экрана) заявки на догазификацию', () => {
let lead_new;

test.beforeEach(async({etpAdminContext})=>{
  lead_new = new LeadsNew(await etpAdminContext.newPage());
  await lead_new.gotoFormUrlUser('1222390');
  await lead_new.inputNameBranch.click();
  await lead_new.chooseElementUlList('г. Псков (головной офис)');
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
  await lead_new.fillInputAdress('г Псков, ул Псковская, д 6');
  await lead_new.chooseElementUlList('г Псков, ул Псковская, д 6');
  await lead_new.inputCadastrNumberArea.type('60:00');
  await lead_new.buttonYesInDialog.click();
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
  await lead_new.inputAdressPost.fill('г Псков, ул Псковская, д 6');
  await lead_new.chooseElementUlList('г Псков, ул Псковская, д 6');
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
});

test('Проверка работы кнопки "Назад" на 9 шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkTextHeader('Контактное лицо');
});

test('Проверка заголовков 9-го шага', async () => {  
  await lead_new.checkTextHeader('Выберите способ коммуникаций по результатам рассмотрения заявки');
});

test('Проверка названия полей 8 шага формы и их видимости', async () => {  
  await lead_new.checkTextLabel('E-mail');
  await lead_new.checkTextLabel('Телефон');
  await lead_new.checkTextLabel('Почта');
  await lead_new.checkNameLabel('Вариант подписания договора');
});

test('Проверка выбора чекбокса "Телефон" 9 шага формы', async () => {
  await expect(await lead_new.returnRadioButton('Телефон')).toBeChecked();
  await expect(lead_new.returnRadioButtonStateChecked('E-mail')).toBeTruthy();
  await expect(lead_new.returnRadioButtonStateChecked('Почта')).toBeTruthy();
});

test('Проверка выбора чекбокса "E-mail" 9 шага формы', async () => {
  await lead_new.chooseRadioButtonList('E-mail');
  await expect(await lead_new.returnRadioButton('E-mail')).toBeChecked();
  await expect(lead_new.returnRadioButtonStateChecked('Телефон')).toBeTruthy();
  await expect(lead_new.returnRadioButtonStateChecked('Почта')).toBeTruthy();
});

test('ППроверка выбора чекбокса "Почта" 9 шага формы', async () => {
  await lead_new.chooseRadioButtonList('Почта');
  await expect(await lead_new.returnRadioButton('Почта')).toBeChecked();
  await expect(lead_new.returnRadioButtonStateChecked('Телефон')).toBeTruthy();
  await expect(lead_new.returnRadioButtonStateChecked('E-mail')).toBeTruthy();
});

test('Проверка заполнения поля "Вариант подписания договора"', async () => {
  await lead_new.checkNamePlaceholderLabel('Вариант подписания договора');
  await lead_new.inputContractSign.click();
  await lead_new.chooseElementUlList('Письменная форма');
  await expect(lead_new.inputContractSign).toHaveValue('Письменная форма');
  await lead_new.inputContractSign.click();
  await lead_new.chooseElementUlList('Электронная форма');
  await expect(lead_new.inputContractSign).toHaveValue('Электронная форма');
});
});



 

