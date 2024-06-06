import { LeadsNew } from '../../../pages/crm/lead_new';
import { test } from '../../../utilites/fixtures';
import { expect } from '@playwright/test';

test.describe('Проверка элементов четвертого шага(экрана) заявки на догазификацию', () => {
let lead_new;

test.beforeEach(async({etpAdminContext})=>{
  lead_new = new LeadsNew(await etpAdminContext.newPage());
  await lead_new.gotoFormUrlUser('1222390');
  await lead_new.inputNameBranch.click();
  await lead_new.chooseElementUlList('г. Псков (головной офис)');
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
  await lead_new.buttonNext.click();
});

test('Проверка работы кнопки "Назад" на четвертом шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkHeaderDivTitle('Сведения о заявителе'); 
});

test('Проверка заголовков четвертого шага', async () => {  
  await lead_new.checkTextHeader('Адрес объекта (местонахождение домовладения, планируемого к газификации)');
  await lead_new.checkTextParagraph('Правила заполнения адреса объекта:');
  await lead_new.checkTextHeader('Введите адрес');
  await lead_new.checkTextHeader('Поля ниже заполняются автоматически');
  await lead_new.checkTextHeader('Заполните Кадастровый номер');
});

test('Проверка списка пунктов инструкции по заполнению адреса', async () => {  
  await lead_new.checkElementsUlList(['1. Начните вводить первые буквы названия вашего города/населенного пункта и выберите его полный адрес во всплывающем окне (если населенный пункт не появляется в списке, попробуйте указать с регионом, например: Гатчинский СНТ дружба).', 
  '2. Дополните выбранный адрес наименованием улицы (при наличии) для этого начните вводить первые буквы названия вашей улицы и выберите из выпадающего списка ниже.', 
  '3. Дополните выбранный адрес номером дома, для этого начните вводить номер вашего дома, корпуса, квартиры и т.п. и выберите его из выпадающего списка ниже.']);    
});

test('Проверка заполнения поля адреса газификации на четвертом шаге(есть город)', async () => {  
  await expect(lead_new.labelInputAdressObjectGaz).toBeVisible();
  await lead_new.fillInputAdress('г Псков, ул Псковская, д 6');
  await lead_new.chooseElementUlList('г Псков, ул Псковская, д 6');
  await expect(lead_new.inputAdressObjectGaz).toHaveValue('г Псков, ул Псковская, д 6');
  await expect(lead_new.inputRegion).toHaveValue('Псковская обл');
  await expect(lead_new.inputDistrict).toBeEmpty();
  await expect(lead_new.inputCity).toHaveValue('Псков');
  await expect(lead_new.inputLocality).toBeEmpty();
  await expect(lead_new.inputStreet).toHaveValue('Псковская');
  await expect(lead_new.inputHouse).toHaveValue('6');
  await expect(lead_new.inputIndex).toHaveValue('180014');
  await expect(lead_new.inputFrame).toBeEmpty();
  await expect(lead_new.inputBuilding).toBeEmpty(); 
});

test('Проверка заполнения поля адреса газификации на четвертом шаге(есть населенный пункт)', async () => {  
  await expect(lead_new.labelInputAdressObjectGaz).toBeVisible();
  await lead_new.fillInputAdress('Псковская обл, Бежаницкий р-н, село Ашево, ул Великопольская, д 3а');
  await lead_new.chooseElementUlList('Псковская обл, Бежаницкий р-н, село Ашево, ул Великопольская, д 3а');
  await expect(lead_new.inputAdressObjectGaz).toHaveValue('Псковская обл, Бежаницкий р-н, село Ашево, ул Великопольская, д 3а');
  await expect(lead_new.inputRegion).toHaveValue('Псковская обл');
  await expect(lead_new.inputDistrict).toHaveValue('Бежаницкий');
  await expect(lead_new.inputCity).toBeEmpty();
  await expect(lead_new.inputLocality).toHaveValue('Ашево')
  await expect(lead_new.inputStreet).toHaveValue('Великопольская');
  await expect(lead_new.inputHouse).toHaveValue('3а');
  await expect(lead_new.inputIndex).toHaveValue('182815');
  await expect(lead_new.inputFrame).toBeEmpty();
  await expect(lead_new.inputBuilding).toBeEmpty(); 
});

test('Проверка очистки поля адреса газификации на четвертом шаге(есть населенный пункт)', async () => {  
  await expect(lead_new.labelInputAdressObjectGaz).toBeVisible();
  await lead_new.fillInputAdress('Псковская обл, Бежаницкий р-н, село Ашево, ул Великопольская, д 3а');
  await lead_new.chooseElementUlList('Псковская обл, Бежаницкий р-н, село Ашево, ул Великопольская, д 3а');
  await lead_new.buttonCleanInputAdress.click();
  await expect(lead_new.inputAdressObjectGaz).toBeEmpty();
  await expect(lead_new.inputRegion).toBeEmpty();
  await expect(lead_new.inputDistrict).toBeEmpty();
  await expect(lead_new.inputCity).toBeEmpty();
  await expect(lead_new.inputLocality).toBeEmpty();
  await expect(lead_new.inputStreet).toBeEmpty();
  await expect(lead_new.inputHouse).toBeEmpty();
  await expect(lead_new.inputIndex).toBeEmpty();
  await expect(lead_new.inputFrame).toBeEmpty();
  await expect(lead_new.inputBuilding).toBeEmpty();  
});

test('Проверка появления диалога подтверждения заполненения кадастра и его закрытие на 4 шаге формы', async () => {  
  await lead_new.inputCadastrNumberArea.type('60');
  await lead_new.checkTextHeader('Объект, планируемый к подключению, находится в регионе Псковская область');
  await lead_new.buttonYesInDialog.click();
  await expect(lead_new.inputCadastrNumberArea).toHaveValue('60::');

});

test('Проверка заполнения поля "Кадастровый номер земельного участка"', async () => {  
  await lead_new.inputCadastrNumberArea.fill('60:00:00');
  await expect(lead_new.inputCadastrNumberArea).toHaveValue('60:00:00');
});

test('Проверка заполнения поля "Кадастровый номер домовладения"', async () => {  
  await lead_new.inputCadastrNumberHouse.fill('60:00:01');
  await expect(lead_new.inputCadastrNumberHouse).toHaveValue('60:00:01');
});

test('Проверка названия полей четвертого шага формы и их видимости', async () => {  
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
  await lead_new.checkTextLabel('Кадастровый номер домовладения');
  await lead_new.checkTextLabel('Кадастровый номер земельного участка'); //возможно баг два лейбла с таким именованием
});

test('Проверка валидации обязательности полей на 4 шаге', async () => {
  lead_new.buttonNext.click();
  await expect(await lead_new.returnValidationInputMessage('Поле обязательно для заполнения')).toHaveCount(5);
});
});



 

