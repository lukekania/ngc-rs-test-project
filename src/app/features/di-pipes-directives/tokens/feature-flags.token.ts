import { InjectionToken } from '@angular/core';

export const FEATURE_FLAGS = new InjectionToken<readonly string[]>('FEATURE_FLAGS', {
  factory: () => [],
});
