import { expect } from '@playwright/test';
import { LeadsNew } from '../../pages/crm/lead_new';
import { test } from '../../utilites/fixtures';



test.describe('Проверка элементов третьего шага(экрана) заявки на догазификацию', () => {
let lead_new:any;

test.beforeEach(async({etpAdminContext})=>{
  lead_new = new LeadsNew(await etpAdminContext.newPage());
  await lead_new.gotoFormUrlUser('1222390');
  await lead_new.inputNameBranch.click();
  await lead_new.chooseElementUlList('г. Псков (головной офис)');
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
});

test('Проверка работы кнопки "Назад" на третьем шаге', async () => {
await  lead_new.buttonBack.click();
await lead_new.checkTextHeader('Кто обращается за услугой'); 
});

test('Проверка вывода полей паспортных данных заявитея и их значений на третьем шаге', async () => {  
  await lead_new.checkTextHeader('Сведения о заявителе');
  await lead_new.checkLabelValue('ФИО', 'Заявитель_ПСКоВ Заявитель_ПСКоВ Заявитель_ПСКоВ');
  await lead_new.checkLabelValue('Дата рождения', '2023-06-20');
  await lead_new.checkLabelValue('СНИЛС', '548-096-168 23');
  await lead_new.checkLabelValue('Паспорт серия', 'Нет данных');
  await lead_new.checkLabelValue('Номер паспорта', 'Нет данных');
  await lead_new.checkLabelValue('Дата выдачи паспорта', 'Нет данных');
  await lead_new.checkLabelValue('Кем выдан', 'Нет данных');
});

test('Проверка вывода поля и его значения "Адрес электронной почты заявителя"', async () => {  
  await lead_new.checkHeaderValue('Адрес электронной почты заявителя', 'tpsg.gpb+01@gmail.com');
});
test('Проверка вывода поля и его значения "Контактный телефон заявителя"', async () => {  
  await lead_new.checkHeaderValue('Контактный телефон заявителя', '+73231232131');
});
});



 

