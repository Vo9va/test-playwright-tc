import { expect, Page } from '@playwright/test';
import path = require("path");

export default class AbstractPage {
  protected page: Page

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(link: string) {
    return this.page.goto(link).catch((e) => this.errorHandling(e, this.page));
  }

  async clickOnElement(selector: string) {
    return this.page
      .click(selector)
      .catch((e) => this.errorHandling(e, this.page));
  }

  async setValueOnElement(selector: string, value: string) {
    return this.page
      .locator(selector).fill(value)
      .catch((e) => this.errorHandling(e, this.page));
  }

  async checkElementIsDisplayed(selector: string){
    await expect(this.page.locator(selector)).toBeVisible()
  }

  async uploadFileOnElement(selector: string) {
    const filePath = path.resolve('./test-data/images/document.jpg');
    return this.page
      .locator(selector)
      .setInputFiles(filePath)
      .catch((e) => this.errorHandling(e, this.page));
  }

  async checkValuesAreEqual(value1, value2){
    await expect(value1).toEqual(value2)
  }

  async checkTitleAreEqual(value){
    await expect(this.page).toHaveTitle(value)
  }

  errorHandling(error, page) {
    throw new Error(`
// ============  ============  TEST FAILED ============  ============
// Page with URL: ${page.url()}
// ERROR TYPE: ${error.name}
// MESSAGE: ${error.message}
// ============  ============  ============ ============  ============`);
  }
}
