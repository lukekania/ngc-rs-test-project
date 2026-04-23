import { Component } from '@angular/core';
import { APP_ENV } from '#env/config';

@Component({
  selector: 'app-package-imports',
  template: `
    <h2>#63 package.json imports field (#subpath)</h2>
    <p>
      <code>package.json</code> declares <code>"imports": &#123; "#env/*": "./src/env/*.ts" &#125;</code>.
      The import statement at the top of this file uses <code>'#env/config'</code>.
      If this renders below, the subpath import resolved correctly.
    </p>
    <ul>
      <li>name: <code>{{ env.name }}</code></li>
      <li>apiBase: <code>{{ env.apiBase }}</code></li>
      <li>flag: <code>{{ env.flag }}</code></li>
    </ul>
  `,
})
export class PackageImportsComponent {
  readonly env = APP_ENV;
}
