import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { FEATURE_FLAGS } from '../../di-pipes-directives/tokens/feature-flags.token';

export const featureFlagGuard = (flag: string): CanMatchFn => {
  return () => {
    const flags = inject(FEATURE_FLAGS);
    return flags.includes(flag);
  };
};
