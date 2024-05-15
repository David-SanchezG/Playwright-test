import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) { }

  public btnAcceder = this.page.locator('.btAccess').last();
  public alertBtnOk = this.page.locator('[ion-button="alert-button"]', { hasText: 'OK' });
  public textLoggedUsername(username: string) {
    return this.page.locator('.userNavbar', { hasText: username });
  }
  public iconAvatar = this.page.locator('.icon-icono_avatar');
  public iconNotifications = this.page.locator('[name="ios-notifications-outline"]');
  public btnDeposit = this.page.locator('button', { hasText: 'Depositar' });
  public btnReload = this.page.locator('.icon-reload').last();
  public dropdownBalance = this.page.locator('.loginOps button .ion-md-arrow-dropdown');

  public btnAllowCookies = this.page.locator('button', { hasText: 'Aceptar todas las cookies' });
  public btnAcceptCookies = this.page.locator('.alertcookies button', { hasText: 'Aceptar' });

}
