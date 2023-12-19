import { expect } from '@playwright/test';
import { LeadsNew } from '../../pages/crm/lead_new';
import { test } from '../../utilites/fixtures';



test.describe('Проверка элементов первого шага(экрана) заявки на догазификацию', () => {
let lead_new:any;

test.beforeEach(async({etpAdminContext})=>{
  lead_new = new LeadsNew(await etpAdminContext.newPage());
  await lead_new.gotoFormUrlUser('1222390');
});

test('Проверка кнопки очистки значения поля "Наименование организации" и его заполнение', async () => {  
  await expect(lead_new.inputNameGro).toHaveValue('АО "Газпром газораспределение Псков"');
  console.log(await lead_new.returnValueInput());
  await lead_new.cleanInputNameGro();
  await expect(lead_new.inputNameGro).toBeEmpty();
  await lead_new.fillInputAutoComplete('Наименование организации', 'АО "Газпром газораспределение Псков"');
  await lead_new.chooseElementUlList('АО "Газпром газораспределение Псков"');
  await expect(lead_new.inputNameGro).toHaveValue('АО "Газпром газораспределение Псков"');
});


test('Проверка заголовка формы "Создание новой заявки" и текста для пользователя СРМ об информировании заявителя', async () => {  
  await expect(lead_new.blockInformationAplicant).toHaveText('Заявитель проинформирован что,');
  await lead_new.checkElementsUlList(['рассмотрение заявки проводится Исполнителем в соответствии с Правилами подключения (технологического присоединения) газоиспользующего оборудования и объектов капитального строительства к сетям газораспределения, утвержденными Постановлением Правительства Российской Федерации от 13.09.2021 № 1547;', 'услуги по подключению в рамках догазификации без взимания платы с заявителя включают в себя мероприятия до границ земельного участка заявителя.']);    
});

test('Проверка названия полей первого шага формы и их видимости', async () => {  
  lead_new.checkNameLabel('Наименование организации');
  lead_new.checkNameLabel('Наименование филиала');
  lead_new.checkNameLabel('Название услуги');
});

test('Проверка плейсхолдеров полей первого шага формы и их видимости', async () => {
  await lead_new.cleanInputNameGro();  
  lead_new.checkNamePlaceholderLabel('Наименование организации');
  lead_new.checkNamePlaceholderLabel('Наименование филиала');
  lead_new.checkNamePlaceholderLabel('Название услуги');
});

test('Проверка заполнения значения поля "Наименование филиала"', async () => {  
  await lead_new.inputNameBranch.click();
  await lead_new.chooseElementUlList('г. Псков (головной офис)');
  await expect(lead_new.inputNameBranch).toHaveValue('г. Псков (головной офис)');
});

test('Проверка заполнения значения поля "Название услуги"', async () => {  
  await lead_new.inputNameService.click();
  await lead_new.chooseElementUlList('Технологическое присоединение');
  await expect(lead_new.inputNameService).toHaveValue('Технологическое присоединение');
});

});



 

