export interface ITransmitterConfig {
  connectXToken: string;
  cronServiceUrl: string;
  messageStormServiceUrl: string;
}

export const transmitterConfig = (): ITransmitterConfig => ({
  connectXToken: process.env.CONNECT_X_TOKEN,
  cronServiceUrl: process.env.CRON_SERVICE_URL,
  messageStormServiceUrl: process.env.MESSAGE_STORM_SERVICE_URL,
});
