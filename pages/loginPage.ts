import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    public inputUsername = this.page.locator('input[name="username"]')
    public inputPassword = this.page.locator('input[name="password"][type="password"]');
    public inputPasswordUnmasked = this.page.locator('input[name="password"][type="text"]');
    public iconEye = this.page.locator('#viewPass');
    public linkForgotPassword = this.page.locator('.rePass');
    public btnLogin = this.page.locator('#btnaccess');
    public btnSignUp = this.page.locator('.goReg > button')
    public linkNotRegistered = this.page.locator('.goReg > p')

    public alertEmptyFields = this.page.locator('.alert-title', { hasText: 'Login' });
    public alertBtnOk = this.page.locator('[ion-button="alert-button"]', { hasText: 'OK' });

    public alertTitleWrongCreds = this.page.locator('.alert-title', { hasText: 'Error de inicio de sesión' });
    public alertLinkPassReminder = this.page.locator('button > span', { hasText: '¿Olvidó su contraseña?' });

    public modalTitlePassReminder = this.page.locator('.contactTitle', { hasText: 'Recordar contraseña' });

}
