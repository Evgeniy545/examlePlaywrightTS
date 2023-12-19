import { expect } from '@playwright/test';
import { LeadsNew } from '../../pages/crm/lead_new';
import { test } from '../../utilites/fixtures';



test.describe('Проверка элементов второго шага(экрана) заявки на догазификацию', () => {
let lead_new;

test.beforeEach(async({etpAdminContext})=>{
  lead_new = new LeadsNew(await etpAdminContext.newPage());
  await lead_new.gotoFormUrlUser('1222390');
  await lead_new.inputNameBranch.click();
  await lead_new.chooseElementUlList('г. Псков (головной офис)');
  await lead_new.buttonNext.click();
});

test('Проверка заголовка второго шага', async () => {  
  await expect(lead_new.headerBlockWho).toHaveText('Кто обращается за услугой');
});

test('Проверка названия полей второго шага формы и их видимости', async () => {
  await expect(await lead_new.returnRadioButton('Заявитель')).toBeChecked();
  expect(await lead_new.returnRadioButtonStateChecked('Уполномоченный представитель')).toBeFalsy();
  await lead_new.chooseRadioButtonList('Уполномоченный представитель');
  await expect(await lead_new.returnRadioButton('Уполномоченный представитель')).toBeChecked();
  expect(await lead_new.returnRadioButtonStateChecked('Заявитель')).toBeFalsy();
});

test('Проверка работы кнопки "Назад" на втором шаге', async () => {
await  lead_new.buttonBack.click();
await lead_new.checkTextHeader('Заявитель проинформирован что,'); 
});

test('Проверка работы кнопки "Далее" на втором шаге', async () => {  
  await lead_new.buttonNext.click();
  await lead_new.checkTextHeader('Сведения о заявителе');
  await lead_new.checkLabelValue('ФИО', 'Заявитель_ПСКоВ Заявитель_ПСКоВ Заявитель_ПСКоВ');
  await lead_new.checkLabelValue('Дата рождения', '2023-06-20');
  await lead_new.checkLabelValue('Дата рождения', '2023-06-20');
});
});



 

