// lead_new.ts
import { expect, Locator, Page } from '@playwright/test';

export class LeadsNew {
  readonly page: Page;
  readonly URL: string;
  readonly id_user: string;

  // форма поиска и выбора заявителя 
  readonly buttonBackInLeads:Locator;
  readonly buttonContinue: Locator;
  readonly headerNewLead: Locator;
  readonly labelInputAplicant: Locator;
  
   // форма создания заявки на догазификацию 
  readonly inputNameGro: Locator;
  readonly labelNameGro: Locator;
  readonly buttonClearNameGro: Locator;
  readonly inputNameBranch: Locator;
  readonly labelNameBranch: Locator;
  readonly inputNameService: Locator;
  readonly labelNameService: Locator;
  readonly blockInformationAplicant: Locator;
  readonly buttonNext: Locator;
  readonly inputError: Locator;
  readonly inputValueBranch: Locator;
  readonly selectBranch: Locator;

   // блок "Кто обращается за услугой"
  readonly headerBlockWho: Locator;
  readonly buttonBack: Locator;

  // блок "Информация о заявителе"
  readonly headerBlockAplicant: Locator;
  readonly fullNameAplicant: Locator;
  readonly labelFullNameAplicant: Locator;
  readonly phoneAplicant: Locator;
  readonly labelPhoneAplicant: Locator;
  readonly emailAplicant: Locator;
  readonly labelEmailAplicant: Locator;
  readonly innAplicant: Locator;
  readonly labelInnAplicant: Locator;
  readonly snilsAplicant: Locator;
  readonly labelSnilsAplicant: Locator;
  readonly birthDateAplicant: Locator;
  readonly labelBirthDateAplicant: Locator;
  readonly typeDocAplicant: Locator;
  readonly labelTypeDocAplican: Locator;
  readonly seriesDocAplicant: Locator;
  readonly labelSeriesDocAplicant: Locator;
  readonly numberDocAplicant: Locator;
  readonly labelNumberDocAplicant: Locator;
  readonly dateDocAplicant: Locator;
  readonly labelDateDocAplicant: Locator;
  readonly orgIssueDocAplicant: Locator;
  readonly labelOrgIssueDocAplicant: Locator;
  readonly checkBoxConfidant: Locator;
  readonly labelCheckBoxConfidant: Locator;

  // блок "Адрес объекта (местонахождение домовладения, планируемого к газификации)"
  readonly headerAdressObjectGaz: Locator;
  readonly infoBlockAdressObjectGaz: Locator;
  readonly headerEnterAdress: Locator;
  readonly inputAdressObjectGaz: Locator;
  readonly labelInputAdressObjectGaz: Locator;
  readonly headerAutoFillFields: Locator;
  readonly inputRegion: Locator;
  readonly labelInputRegion: Locator;
  readonly inputDisdrict: Locator;
  readonly labelInputDisdrict: Locator;
  readonly inputCity: Locator;
  readonly labelInputCity: Locator;
  readonly inputLocality: Locator;
  readonly labelInputLocality: Locator;
  readonly inputStreet: Locator;
  readonly labelInputStreet: Locator;
  readonly inputHouse: Locator;
  readonly labelInputHouse: Locator;
  readonly inputIndex: Locator;
  readonly labelInputIndex: Locator;
  readonly inputFrame: Locator;
  readonly labelInputFrame: Locator;
  readonly inputBuilding: Locator;
  readonly labelInputBuilding: Locator;
  readonly inputCadastrNumberArea: Locator;
  readonly labelInputCadastrNumberArea: Locator;
  readonly inputCadastrNumberHouse: Locator;
  readonly labelInputCadastrNumberHouse: Locator;
  readonly textInfoInputPlannedGasConsumption: Locator;
  readonly inputPlannedGasConsumption: Locator;
  readonly labelInputPlannedGasConsumption: Locator; 

  // блок "Адрес для корреспонденции"

  readonly headerAdressPost: Locator;
  readonly headerEnterAdressPost: Locator;
  readonly inputAdressPost: Locator;
  readonly labelInputAdressPost: Locator;
  readonly headerAutoFillFieldsPost: Locator;
  readonly inputRegionPost: Locator;
  readonly labelInputRegionPost: Locator;
  readonly inputDisdrictPost: Locator;
  readonly labelInputDisdrictPost: Locator;
  readonly inputCityPost: Locator;
  readonly labelInputCityPost: Locator;
  readonly inputLocalityPost: Locator;
  readonly labelInputLocalityPost: Locator;
  readonly inputStreetPost: Locator;
  readonly labelInputStreetPost: Locator;
  readonly inputHousePost: Locator;
  readonly labelInputHousePost: Locator;
  readonly inputIndexPost: Locator;
  readonly labelInputIndexPost: Locator;
  readonly inputFramePost: Locator;
  readonly labelInputFramePost: Locator;
  readonly inputBuildingPost: Locator;
  readonly labelInputBuildingPost: Locator;
  readonly inputCadastrNumberAreaPost: Locator;
  
  // блок "Полученные ранее ТУ (при наличии)"
  readonly headerSpecifications: Locator;
  readonly inputNumberSpecifications: Locator;
  readonly labelNumberSpecifications: Locator;
  readonly inputDateSpecifications: Locator;
  readonly labelDateSpecifications: Locator;

  // блок "Дополнительная информация"
  readonly inputAddInformation: Locator;
  readonly labelAddInformation: Locator;

  // блок "Контактное лицо"
  readonly headerContact: Locator;
  readonly inputFullNameContact: Locator;
  readonly labelFullNameContact: Locator;
  readonly inputPhoneContact: Locator;
  readonly labelPhoneContact: Locator;
  readonly inputEmailContact: Locator;
  readonly labelEmailContact: Locator;
  readonly inputConnectContact: Locator;
  readonly labelConnectContact: Locator;
  readonly inputContractSign: Locator;
  readonly labelContractSign: Locator;

  // Кнопка "Сохранить"
  readonly buttonSaveLead: Locator;


  constructor(page: Page) {
    this.page = page;
    this.URL = 'crm/leads/new';
    this.id_user = '';
    // форма поиска и выбора заявителя
    this.buttonBackInLeads = page.locator('href=/crm/leads');
    this.buttonContinue = page.locator('button', { hasText: 'Продолжить' });
    this.headerNewLead = page.locator('//header/div/div/div', { hasText: 'Создание новой заявки' });
    this.labelInputAplicant = page.locator('span', { hasText: 'Наименование организации или ФИО' });

   // форма создания заявки на догазификацию
  this.inputNameGro = page.locator('id=organization_id');
  this.labelNameGro = page.locator('label', { hasText: 'Наименование организации' });
  this.buttonClearNameGro = page.locator('//*[@id="__layout"]/div/div[3]/div/div/div/div[2]/div/form/div/div[2]/div[1]/div/div/div/div/div/div');
  this.inputNameBranch = page.locator('id=branch_id');
  this.labelNameBranch = page.locator('label', { hasText: 'Наименование филиала' });
  this.inputNameService = page.locator('id=service_id');
  this.labelNameService = page.locator('label', { hasText: 'Название услуги' });
  this.blockInformationAplicant = page.locator('h4', { hasText: 'Заявитель проинформирован что,'});
  this.buttonNext = page.locator('text=Далее');
  this.inputError = page.locator('div.inputError', { hasText: 'Поле обязательно для заполнения' });
  this.selectBranch = page.locator('#__layout > div > div > div > div > div > div:nth-child(2) > div > form > div > div:nth-child(3) > div:nth-child(2) > div > label > div > div > div');
  this.inputValueBranch = page.locator('//ul/li/div', {hasText: 'г. Псков (головной офис)'});

    // блок "Кто обращается за услугой"
  this.headerBlockWho =  page.locator('h4', {hasText: 'Кто обращается за услугой'}); 
  this.buttonBack = page.locator('text=Назад');


  // блок "Информация о заявителе"
  this.headerBlockAplicant = page.locator('h4', {hasText: 'Сведения о заявителе'});
  this.fullNameAplicant = page.locator('');
  this.labelFullNameAplicant = page.locator('');
  this.phoneAplicant = page.locator('');
  this.labelPhoneAplicant = page.locator('');
  this.emailAplicant = page.locator('');
  this.labelEmailAplicant = page.locator('');
  this.innAplicant = page.locator('');
  this.labelInnAplicant = page.locator('');
  this.snilsAplicant = page.locator('');
  this.labelSnilsAplicant = page.locator('');
  this.birthDateAplicant = page.locator('');
  this.labelBirthDateAplicant = page.locator('');
  this.typeDocAplicant = page.locator('');
  this.labelTypeDocAplican = page.locator('');
  this.seriesDocAplicant = page.locator('');
  this.labelSeriesDocAplicant = page.locator('');
  this.numberDocAplicant = page.locator('');
  this.labelNumberDocAplicant = page.locator('');
  this.dateDocAplicant = page.locator('');
  this.labelDateDocAplicant = page.locator('');
  this.orgIssueDocAplicant = page.locator('');
  this.labelOrgIssueDocAplicant = page.locator('');
  this.checkBoxConfidant = page.locator('');
  this.labelCheckBoxConfidant = page.locator('');

  // блок "Адрес объекта (местонахождение домовладения, планируемого к газификации)"
  this.headerAdressObjectGaz = page.locator('');
  this.infoBlockAdressObjectGaz = page.locator('');
  this.headerEnterAdress = page.locator('');
  this.inputAdressObjectGaz = page.locator('');
  this.labelInputAdressObjectGaz = page.locator('');
  this.headerAutoFillFields = page.locator('');
  this.inputRegion = page.locator('');
  this.labelInputRegion = page.locator('');
  this.inputDisdrict = page.locator('');
  this.labelInputDisdrict = page.locator('');
  this.inputCity = page.locator('');
  this.labelInputCity = page.locator('');
  this.inputLocality = page.locator('');
  this.labelInputLocality = page.locator('');
  this.inputStreet = page.locator('');
  this.labelInputStreet = page.locator('');
  this.inputHouse = page.locator('');
  this.labelInputHouse = page.locator('');
  this.inputIndex = page.locator('');
  this.labelInputIndex = page.locator('');
  this.inputFrame = page.locator('');
  this.labelInputFrame = page.locator('');
  this.inputBuilding = page.locator('');
  this.labelInputBuilding = page.locator('');
  this.inputCadastrNumberArea = page.locator('');
  this.labelInputCadastrNumberArea = page.locator('');
  this.inputCadastrNumberHouse = page.locator('');
  this.labelInputCadastrNumberHouse = page.locator('');
  this.textInfoInputPlannedGasConsumption = page.locator('');
  this.inputPlannedGasConsumption = page.locator('');
  this.labelInputPlannedGasConsumption = page.locator(''); 

  // блок "Адрес для корреспонденции"

  this.headerAdressPost = page.locator('');
  this.headerEnterAdressPost = page.locator('');
  this.inputAdressPost = page.locator('');
  this.labelInputAdressPost = page.locator('');
  this.headerAutoFillFieldsPost = page.locator('');
  this.inputRegionPost = page.locator('');
  this.labelInputRegionPost = page.locator('');
  this.inputDisdrictPost = page.locator('');
  this.labelInputDisdrictPost = page.locator('');
  this.inputCityPost = page.locator('');
  this.labelInputCityPost = page.locator('');
  this.inputLocalityPost = page.locator('');
  this.labelInputLocalityPost = page.locator('');
  this.inputStreetPost = page.locator('');
  this.labelInputStreetPost = page.locator('');
  this.inputHousePost = page.locator('');
  this.labelInputHousePost = page.locator('');
  this.inputIndexPost = page.locator('');
  this.labelInputIndexPost = page.locator('');
  this.inputFramePost = page.locator('');
  this.labelInputFramePost = page.locator('');
  this.inputBuildingPost = page.locator('');
  this.labelInputBuildingPost = page.locator('');
  this.inputCadastrNumberAreaPost = page.locator('');
  
  // блок "Полученные ранее ТУ (при наличии)"
  this.headerSpecifications = page.locator('');
  this.inputNumberSpecifications = page.locator('');
  this.labelNumberSpecifications = page.locator('');
  this.inputDateSpecifications = page.locator('');
  this.labelDateSpecifications = page.locator('');

  // блок "Дополнительная информация"
  this.inputAddInformation = page.locator('');
  this.labelAddInformation = page.locator('');

  // блок "Контактное лицо"
  this.headerContact = page.locator('');
  this.inputFullNameContact = page.locator('');
  this.labelFullNameContact = page.locator('');
  this.inputPhoneContact = page.locator('');
  this.labelPhoneContact = page.locator('');
  this.inputEmailContact = page.locator('');
  this.labelEmailContact = page.locator('');
  this.inputConnectContact = page.locator('');
  this.labelConnectContact = page.locator('');
  this.inputContractSign = page.locator('');
  this.labelContractSign = page.locator('');

  // Кнопка "Сохранить"
  this.buttonSaveLead = page.locator('');



  }

  async goto() {
    await this.page.goto(this.URL);
  }

  async gotoFormUrlUser(id_user: string) {
    await this.page.goto(this.URL+'/'+id_user);
    await expect(this.page).toHaveURL(this.URL+'/'+id_user);
  }  

  async cleanInputNameGro() {
    await expect(this.buttonClearNameGro).toBeVisible();
    this.buttonClearNameGro.dispatchEvent('click');
  }  

  async returnValueInput() {
    return this.inputNameGro.inputValue();
  }  

  async fillInputBranchGro() {
    await this.inputNameBranch.dispatchEvent('click');
    await this.inputValueBranch.click();
  }
  
  
  async chooseElementUlList(text:string) {
    await this.page
    .getByRole('listitem')
    .filter({ hasText: text })
    .click();
  }  

  async checkElementsUlList(textArray:[]) {
    await expect(this.page
      .getByRole('listitem'))
      .toHaveText(textArray);
  }
  
  async checkNameLabel(text:string) {
    await expect(this.page.getByLabel(text)).toBeVisible();
  }

   async checkNamePlaceholderLabel(text:string) {
    await expect(this.page.getByPlaceholder(text)).toBeVisible();
  }
  
  async fillInputAutoComplete(name:string, text:string) {
    await this.page.getByLabel(name).fill(text);
  }

  async chooseRadioButtonList(text:string) {
    this.page.getByText(text).click();
  }
  
  async returnRadioButton(text:string) {
    return this.page.locator('label', {has: this.page.locator('text="'+text+'"')}).locator('input');
  }

  async returnRadioButtonStateChecked(text:string) {
    return await this.page.locator('label', {has: this.page.locator('text="'+text+'"')}).locator('input').isChecked();
  }

  async checkTextHeader(text:string) {
    await expect(this.page.getByRole('heading',{name:text})).toBeVisible();
  }

  async checkLabelValue(title:string, value:string) {
    expect(await this.page.locator('div.formPreview__item').filter({hasText:title}).getByText(value)).toBeVisible();
  }


  async checkHeaderValue(title:string, value:string) {
    expect(await this.page.locator('div').filter({hasText:title}).getByText(value)).toBeVisible();
  }


}