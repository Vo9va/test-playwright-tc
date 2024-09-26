import { defineConfig, devices } from '@playwright/test';
import { reportPortalHelper } from './helper/reportPortal';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['@reportportal/agent-js-playwright', reportPortalHelper.getReportConfig()]],
  timeout: 30000,
  globalTimeout: 600000,
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        screenshot: 'only-on-failure',
      },
    },
  ],
});
