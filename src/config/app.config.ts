export interface IAppConfig {
  logo: string;
  name: string;
  panelUrl: string;
}

export const appConfig = (): IAppConfig => ({
  logo: process.env.APP_LOGO,
  name: process.env.APP_NAME,
  panelUrl: process.env.APP_PANEL_URL,
});
