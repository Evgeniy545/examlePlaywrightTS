import { request } from '@playwright/test';

async function globalSetup() {
  const requestContext = await request.newContext();
  await requestContext.post('/crm', {
    form: {
      'user': 'y.dyurchek@etpgpb.ru',
      'password': 'y*n@cb9XIxZnWO8h'
    }
  });
  // Save signed-in state to 'storageState.json'.
  await requestContext.storageState({ path: 'storageState.json' });
  await requestContext.dispose();
}

export default globalSetup;