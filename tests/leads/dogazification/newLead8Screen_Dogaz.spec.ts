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
});

test('Проверка работы кнопки "Назад" на 8 шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkTextHeader('Реквизиты ранее выданных технических условий');
});

test('Проверка заголовков 8-го шага', async () => {  
  await lead_new.checkTextHeader('Контактное лицо');
});

test('Проверка названия полей 8 шага формы и их видимости', async () => {  
  await lead_new.checkNameLabel('ФИО');
  await lead_new.checkNameLabel('Телефон');
  await lead_new.checkNameLabel('Адрес электронной почты');
});

test('Проверка плейсхолдеров полей 8 шага формы и их видимости', async () => {
  await lead_new.checkNamePlaceholderLabel('ФИО');
  await lead_new.checkNamePlaceholderLabel('Телефон');
  await lead_new.checkNamePlaceholderLabel('Адрес электронной почты');
});

test('Проверка заполнения поля "Номер полученных ранее ТУ" 8 шага формы и их видимости', async () => {
  await lead_new.fillInputAutoComplete('ФИО', 'Иванов Иван Иванович');
  await expect(await lead_new.returnLabel('ФИО')).toHaveValue('Иванов Иван Иванович');
});

test('Проверка заполнения поля "Дополнительная информация" 8 шага формы и их видимости', async () => {
  await lead_new.fillInputAutoComplete('Телефон', '1111111111');
  await expect(await lead_new.returnLabel('Телефон')).toHaveValue('+7 (111) 111-11-11');
});

test('Проверка заполнения поля "Дата выдачи полученных ранее ТУ" вводом даты без календаря 8 шага формы и их видимости', async () => {
  await lead_new.fillInputAutoComplete('Адрес электронной почты', '1@gmail.com');
  await expect(await lead_new.returnLabel('Адрес электронной почты')).toHaveValue('1@gmail.com');
});


test('Проверка валидации поля телефон на полноту заполнения на 8 шаге', async () => {
  await lead_new.fillInputAutoComplete('Телефон', '111111111');
  await expect(await lead_new.returnValidationInputMessage('Некорректно заполнен телефон')).toHaveCount(1); // Возможно баг на полноту телефона без 11-ой цифры
});

test('Проверка валидации поля Адрес электронной почты на полноту заполнения на 8 шаге', async () => {
  await lead_new.fillInputAutoComplete('Адрес электронной почты', '123');
  await expect(await lead_new.returnValidationInputMessage('Некорректный адрес электронной почты')).toHaveCount(1); 
});




});



 

