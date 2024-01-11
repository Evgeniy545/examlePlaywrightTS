import { LeadsNew } from '../../../pages/crm/lead_new';
import { test } from '../../../utilites/fixtures';
import { expect } from '@playwright/test';
import { getCurrentDate} from '../../../utilites/helpers';

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
});

test('Проверка работы кнопки "Назад" на 7 шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkTextHeader('Адрес для корреспонденции');
});

test('Проверка заголовков 7-го шага', async () => {  
  await lead_new.checkTextHeader('Реквизиты ранее выданных технических условий');
  await lead_new.checkTextParagraph('Вы можете пропустить этот шаг, нажав на кнопку Далее');
});

test('Проверка названия полей 7 шага формы и их видимости', async () => {  
  await lead_new.checkNameLabel('Номер полученных ранее ТУ');
  await lead_new.checkNameLabel('Дата выдачи полученных ранее ТУ');
  await lead_new.checkNameLabel('Дополнительная информация');
});

test('Проверка плейсхолдеров полей 7 шага формы и их видимости', async () => {
  await lead_new.checkNamePlaceholderLabel('Номер полученных ранее ТУ');
  await lead_new.checkNamePlaceholderLabel('Дата выдачи полученных ранее ТУ');
  await lead_new.checkNamePlaceholderLabel('Дополнительная информация');
});

test('Проверка заполнения поля "Номер полученных ранее ТУ" 7 шага формы и их видимости', async () => {
  await lead_new.fillInputAutoComplete('Номер полученных ранее ТУ', '1q2w3e4r5t');
  await expect(await lead_new.returnLabel('Номер полученных ранее ТУ')).toHaveValue('1q2w3e4r5t');
});

test('Проверка заполнения поля "Дополнительная информация" 7 шага формы и их видимости', async () => {
  await lead_new.fillInputAutoComplete('Дополнительная информация', 'Дополнительная информация');
  await expect(await lead_new.returnLabel('Дополнительная информация')).toHaveValue('Дополнительная информация');
});

test('Проверка заполнения поля "Дата выдачи полученных ранее ТУ" вводом даты без календаря 7 шага формы и их видимости', async () => {
  await lead_new.fillInputAutoComplete('Дата выдачи полученных ранее ТУ', '20.07.2008');
  await expect(await lead_new.returnLabel('Дата выдачи полученных ранее ТУ')).toHaveValue('20.07.2008');
});


test('Проверка заполнения поля "Дата выдачи полученных ранее ТУ" вводом даты из календаря 7 шага формы и их видимости', async () => {
  await lead_new.buttonRunCalendar.click();
  await lead_new.buttonToday.click(); 
  const date = await getCurrentDate();
  await expect(await lead_new.returnLabel('Дата выдачи полученных ранее ТУ')).toHaveValue(date);
});


});



 

