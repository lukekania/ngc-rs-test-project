import { InjectionToken } from '@angular/core';

export interface AppConfig {
  readonly appName: string;
  readonly apiBase: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
