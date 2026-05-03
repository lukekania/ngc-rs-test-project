import { Component } from '@angular/core';
import { APP_ENV } from '#env/config';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-package-imports',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="package.json imports (#subpath)"
      groupLabel="Build & Platform"
      description="Resolve internal modules through the package.json imports field."
      [issue]="63"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <code>package.json</code> declares
          <code>"imports": &#123; "#env/*": "./src/env/*.ts" &#125;</code>. The import at the top of
          this component uses <code>'#env/config'</code>. If the values render below, the subpath
          import resolved correctly.
        </p>
      </ng-container>

      <ul>
        <li>name: <code>{{ env.name }}</code></li>
        <li>apiBase: <code>{{ env.apiBase }}</code></li>
        <li>flag: <code>{{ env.flag }}</code></li>
      </ul>
    </app-feature-page>
  `,
})
export class PackageImportsComponent {
  readonly env = APP_ENV;
}
