import { LeadsNew } from '../../../pages/crm/lead_new';
import { test } from '../../../utilites/fixtures';
import { expect } from '@playwright/test';

test.describe('Проверка элементов пятого шага(экрана) заявки на догазификацию', () => {
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

});

test('Проверка работы кнопки "Назад" на пятом шаге', async () => {
await lead_new.buttonBack.click();
await lead_new.checkTextHeader('Адрес объекта (местонахождение домовладения, планируемого к газификации)'); 
});

test('Проверка заголовков пятого шага', async () => {  
  await lead_new.checkTextHeader('Планируемая величина максимального часового расхода газа');
  await lead_new.checkTextHeader('СНТ/ОНТ');
  await lead_new.checkTextParagraph('Укажите предполагаемый максимальный часовой расход газа в куб. метрах/час. В поле можно вводить как целое число, так число, разделенное запятой.');
});

test('Проверка заполнения поля "Планируемая величина максимального часового расхода газа"', async () => {  
  await lead_new.fillInputAutoComplete('Планируемая величина максимального часового расхода газа', '25,25');
  await expect(lead_new.inputPlannedGasConsumption).toHaveValue('25,25');
});

test('Проверка заполнения чекбокса "Садоводческое/огородническое некоммерческое товарищество"', async () => {  
  expect(await lead_new.returnCheckBoxStatusChecked('Садоводческое/огородническое некоммерческое товарищество')).toBeFalsy();
  await lead_new.checkBoxSNTONT.click();
  await lead_new.checkTextLabel('ИНН');
  await lead_new.checkNamePlaceholderLabel('ИНН')
  await lead_new.checkTextLabel('ОГРН');
  await lead_new.checkNamePlaceholderLabel('ОГРН')
  expect(await lead_new.returnCheckBox('Садоводческое/огородническое некоммерческое товарищество')).toBeChecked();
  await lead_new.checkBoxSNTONT.click();
  expect(await lead_new.returnCheckBoxStatusChecked('Садоводческое/огородническое некоммерческое товарищество')).toBeFalsy();
  expect(await lead_new.returnLabel('ИНН')).toBeHidden();
  expect(await lead_new.returnLabel('ОГРН')).toBeHidden(); 
});

test('Проверка названия полей пятого шага формы и их видимости', async () => {  
  await lead_new.checkNameLabel('Планируемая величина максимального часового расхода газа');
  await lead_new.checkTextLabel('Садоводческое/огородническое некоммерческое товарищество');
});

test('Проверка заполнения полей ИНН и ОГРН пятого шага формы', async () => {
  await lead_new.checkBoxSNTONT.click();  
  await lead_new.fillInput('ИНН', '1111111111');
  await lead_new.fillInput('ОГРН', '0101010111111');
  expect(await lead_new.returnLabel('ИНН')).toHaveValue('1111111111');
  expect(await lead_new.returnLabel('ОГРН')).toHaveValue('0101010111111');
});

test('Проверка валидации поля ИНН пятого шага формы при внесении некорркетных значений', async () => {
  await lead_new.checkBoxSNTONT.click();  
  await lead_new.fillInput('ИНН', '11111111');
  expect(await lead_new.returnValidationInputMessage('Длина должна быть не меньше 10 символов')).toHaveCount(1);
});

test('Проверка валидации поля ОГРН пятого шага формы при внесении некорркетных значений', async () => {
  await lead_new.checkBoxSNTONT.click();
  await lead_new.fillInput('ОГРН', '01010111111');  
  expect(await lead_new.returnValidationInputMessage('Длина должна быть не меньше 13 символов')).toHaveCount(1);
});


});



 

