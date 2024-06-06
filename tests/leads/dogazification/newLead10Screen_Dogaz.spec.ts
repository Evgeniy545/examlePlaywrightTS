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
  await lead_new.buttonNext.click();
});

test('Проверка работы кнопки "Назад" на 10 шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkTextHeader('Выберите способ коммуникаций по результатам рассмотрения заявки');
});

test('Проверка заголовков 10-го шага', async () => {  
  await lead_new.checkTextHeader('Документы');
  await lead_new.checkTextHeader('Заявка');
  await lead_new.checkTextHeader('Паспорт гражданина РФ или иной документ удостоверяющий личность');
  await lead_new.checkTextHeader('Правоустанавливающие документы на земельный участок');
  await lead_new.checkTextHeader('Документы, подтверждающие право собственности или иное предусмотренное законом право на объект капитального строительства');
  await lead_new.checkTextHeader('Ситуационный план');
  await lead_new.checkTextHeader('Расчет планируемого максимального часового расхода газа');
  await lead_new.checkTextHeader('Дополнительные документы');
  await lead_new.checkTextHeader('Согласие долевого собственника');
});

test('Проверка загрузки документа "Паспорт гражданина РФ или иной документ удостоверяющий личность"', async () => {  
  await lead_new.chooseRadioButtonList('Паспорт гражданина РФ или иной документ удостоверяющий личность');
  await lead_new.uploadDocuments('Прикрепить файл', 0, '../files_upload/bfoto (5).pdf');
 // Тут нужно добавить асерт на проверку что файл подгружен

});
});



 

