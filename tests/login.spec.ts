import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { MainPage } from '../pages/mainPage';
import { password, username } from '../globals';

let loginPage: LoginPage;
let mainPage: MainPage;
test.describe('Login tests', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await page.goto('https://m.apuestas.codere.es/');
    await page.waitForLoadState('load');
    try {
      await mainPage.btnAllowCookies.waitFor({ state: 'visible', timeout: 5000 });
      await mainPage.btnAllowCookies.click();
    } catch {
    }
    await mainPage.btnAcceptCookies.isVisible() ? await mainPage.btnAcceptCookies.click() : null;
  });

  test('See login page', async () => {
    await mainPage.btnAcceder.click();
    await expect(loginPage.inputUsername).toBeVisible();
    await expect(loginPage.inputPassword).toBeVisible();
    await expect(loginPage.btnLogin).toBeVisible();
    await expect(loginPage.btnSignUp).toBeVisible();
  });

  test('Successful login', async ({ page }) => {
    await mainPage.btnAcceder.click();
    await loginPage.inputUsername.fill(username!);
    await loginPage.inputPassword.fill(password!);
    await loginPage.btnLogin.click();
    await expect(mainPage.iconAvatar).toBeVisible();
    if (test.info().project.name != 'Mobile Chrome') {
      await expect(mainPage.iconNotifications).toBeVisible();
      await expect(mainPage.btnDeposit).toBeVisible();
    }
    await expect(mainPage.btnReload).toBeVisible({timeout: 10000});
    await expect(mainPage.dropdownBalance).toBeVisible();
  });

  test('Wrong characters', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputUsername.fill('@./%&');
    await loginPage.inputPassword.fill(password!);
    await loginPage.btnLogin.click();
    await expect(loginPage.alertTitleWrongCreds).toBeVisible({ timeout: 3000 });
    await expect(loginPage.alertLinkPassReminder).toBeVisible();
  });

  test('Wrong login', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputUsername.fill('abc5de');
    await loginPage.inputPassword.fill(password!);
    await loginPage.btnLogin.click();
    await expect(loginPage.alertTitleWrongCreds).toBeVisible({ timeout: 5000 });
    await expect(loginPage.alertLinkPassReminder).toBeVisible();
  });

  test('Wrong password', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputUsername.fill(username!);
    await loginPage.inputPassword.fill('Abcde1234');
    await loginPage.btnLogin.click();
    await expect(loginPage.alertTitleWrongCreds).toBeVisible({ timeout: 5000 });
    await expect(loginPage.alertLinkPassReminder).toBeVisible();
  });

  test('Empty login', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputPassword.fill(password!);
    await loginPage.btnLogin.click();
    await expect(loginPage.alertEmptyFields).toBeVisible({ timeout: 3000 });
  });

  test('Empty password', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputUsername.fill(username!);
    await loginPage.btnLogin.click();
    await expect(loginPage.alertEmptyFields).toBeVisible({ timeout: 3000 });
  });

  test('Password reminder', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputUsername.fill('abc5de');
    await loginPage.inputPassword.fill(password!);
    await loginPage.btnLogin.click();
    await loginPage.alertLinkPassReminder.click();
    await expect(loginPage.modalTitlePassReminder).toBeVisible({ timeout: 3000 });
  });

  test('Unmask Password', async () => {
    await mainPage.btnAcceder.click();
    await loginPage.inputPassword.fill(password!);
    await loginPage.iconEye.click();
    await expect(loginPage.inputPasswordUnmasked).toBeVisible();
  });
});
