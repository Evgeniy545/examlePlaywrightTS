import { expect, test } from '@playwright/test'
import { getListContracts, createContract, updateStatusContract, updateDatesContract, updateContract, getContract, deleteContract, getHistoryContract } from '../../utilites/helpers';
import data_storage_auditor from '../../.auth/storage_auditor.json';
import data_body_contract from '../../data/body_contract.json';
import data_body_upd_date from '../../data/body_contract_upd_date.json'

test.describe('chromium only', () => {
    test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

test('Проверка доступа к методу получения списка договоров под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const res = await getListContracts(token);
    //console.log(await res.body());
    await expect(res).toBeOK();
    const b = await res.json();
    console.log(b);
    expect(b).toHaveProperty('meta.total_pages');
    expect(b).toHaveProperty('data[0].id');
});

test('Проверка отсутствия доступа к методу создания договоров под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const body_contract = data_body_contract;
    const res = await createContract('1500610', token, body_contract);
    expect(res.status()).toBe(403);
    expect(await res.json()).toHaveProperty('errors.title', 'forbidden');
    expect(await res.json()).toHaveProperty('errors.detail', 'Не хватает прав для данного действия');
    console.log(await res.json());
});     

test('Проверка отсутствия доступа к методу обновления договоров под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const body_contract = data_body_contract;
    const res = await updateContract('1500587', token, body_contract);
    expect(res.status()).toBe(403);
    expect(await res.json()).toHaveProperty('errors.title', 'forbidden');
    expect(await res.json()).toHaveProperty('errors.detail', 'Не хватает прав для данного действия');
    console.log(await res.json());
});

test('Проверка доступа к методу получения одного договора под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const res = await getContract('1500587', token);
    //console.log(await res.body());
    await expect(res).toBeOK();
    const b = await res.json();
    console.log(b);
    expect(b).toHaveProperty('data.type', 'contract');
    expect(b).toHaveProperty('data.id', '1228263');
});

test('Проверка отсутствия доступа к методу удаления договоров под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const res = await deleteContract('1500587', token);
    expect(res.status()).toBe(403);
    expect(await res.json()).toHaveProperty('errors.title', 'forbidden');
    expect(await res.json()).toHaveProperty('errors.detail', 'Не хватает прав для данного действия');
    console.log(await res.json());
});

test('Проверка отсутствия доступа к методу получения истории по договору под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const res = await getHistoryContract('1500587', token);
    expect(res.status()).toBe(403);
    expect(await res.json()).toHaveProperty('errors.title', 'forbidden');
    expect(await res.json()).toHaveProperty('errors.detail', 'Не хватает прав для данного действия');
    console.log(await res.json());
});

test('Проверка отсутствия доступа к методу обновления статуса договора под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const res = await updateStatusContract('1500587', token, data_body_contract);
    expect(res.status()).toBe(403);
    expect(await res.json()).toHaveProperty('errors.title', 'forbidden');
    expect(await res.json()).toHaveProperty('errors.detail', 'Не хватает прав для данного действия');
    console.log(await res.json());
});

test('Проверка отсутствия доступа к методу обновления дат договора под ролью Аудитор', async ({ }) => {
    const token = String(data_storage_auditor.cookies[0].value);
    const res = await updateDatesContract('1500587', token, data_body_upd_date);
    expect(res.status()).toBe(403);
    expect(await res.json()).toHaveProperty('errors.title', 'forbidden');
    expect(await res.json()).toHaveProperty('errors.detail', 'Не хватает прав для данного действия');
    console.log(await res.json());
});

});