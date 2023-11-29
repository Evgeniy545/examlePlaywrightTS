import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
//import dotenv from 'dotenv';
//import { defineConfig } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
//dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  testDir: './../tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {

    timeout: 5000
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ['allure-playwright']],  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //navigationTimeout: 60 * 1000,
    //storageState: 'storage/storageState2.json',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    screenshot: 'only-on-failure',
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      testIgnore: '*api/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      testIgnore: '*api/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
      },
    },    
    {
      name: 'webkit',
      testIgnore: '*api/*.spec.ts',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'api',
      testMatch: '*api/*.spec.ts',

    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};
export default config;
