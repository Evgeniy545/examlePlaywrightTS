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
});

test('Проверка работы кнопки "Назад" на шестом шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkTextHeader('Планируемая величина максимального часового расхода газа'); 
});

test('Проверка заголовков шестого шага', async () => {  
  await lead_new.checkTextHeader('Адрес для корреспонденции');
  await lead_new.checkTextHeader('Введите адрес');
  await lead_new.checkTextHeader('Поля ниже заполняются автоматически');
});


test('Проверка заполнения поля адреса кореспонденции на шестом шаге', async () => {  
  await expect(lead_new.labelInputAdressPost).toBeVisible();
  await lead_new.inputAdressPost.fill('г Псков, ул Псковская, д 6');
  await lead_new.chooseElementUlList('г Псков, ул Псковская, д 6');
  await expect(lead_new.inputAdressPost).toHaveValue('г Псков, ул Псковская, д 6');
  await expect(lead_new.inputRegionPost).toHaveValue('Псковская обл');
  await expect(lead_new.inputDistrictPost).toBeEmpty();
  await expect(lead_new.inputCityPost).toHaveValue('Псков');
  await expect(lead_new.inputLocalityPost).toBeEmpty();
  await expect(lead_new.inputStreetPost).toHaveValue('Псковская');
  await expect(lead_new.inputHousePost).toHaveValue('6');
  await expect(lead_new.inputIndexPost).toHaveValue('180014');
  await expect(lead_new.inputFramePost).toBeEmpty();
  await expect(lead_new.inputBuildingPost).toBeEmpty(); 
});

test('Проверка названия полей шестого шага формы и их видимости', async () => {  
  await lead_new.checkTextLabel('Регион, район, город, улица, дом, квартира');
  await lead_new.checkTextLabel('Регион');
  await lead_new.checkTextLabel('Район');
  await lead_new.checkTextLabel('Город');
  await lead_new.checkTextLabel('Населенный пункт');
  await lead_new.checkTextLabel('Улица');
  await lead_new.checkTextLabel('Дом');
  await lead_new.checkTextLabel('Индекс');
  await lead_new.checkTextLabel('Корпус');
  await lead_new.checkTextLabel('Строение/литера');
});

test('Проверка валидации обязательности полей на 6 шаге', async () => {
  lead_new.buttonNext.click();
  await expect(await lead_new.returnValidationInputMessage('Поле обязательно для заполнения')).toHaveCount(3);
});
});



 

