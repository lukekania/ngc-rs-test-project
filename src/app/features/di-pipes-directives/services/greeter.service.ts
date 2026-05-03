import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../tokens/app-config.token';

@Injectable({ providedIn: 'root' })
export class GreeterService {
  private readonly config = inject(APP_CONFIG);

  greet(name: string): string {
    return `Hello ${name}, from ${this.config.appName}.`;
  }
}
