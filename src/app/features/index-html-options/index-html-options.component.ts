import { Component, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-index-html-options',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="baseHref, deployUrl, crossOrigin & SRI"
      groupLabel="Build & Platform"
      description="Build configurations that rewrite injected script/link tags in index.html."
      [issue]="67"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <code>angular.json</code> defines a <code>staging</code> configuration that sets all four
          options. Build with <code>ng build --configuration staging</code>; the emitted
          <code>index.html</code> should contain <code>&lt;base href="/app/"&gt;</code>, every
          injected <code>script</code>/<code>link</code> prefixed with <code>deployUrl</code>, and
          each injected tag carries <code>crossorigin</code> and <code>integrity</code> attributes.
        </p>
      </ng-container>

      <pre class="cfg">{{ stagingCfg }}</pre>
      <pre class="cmd">ng build --configuration staging &amp;&amp; cat dist/test-ng-project/browser/index.html</pre>
      <p>Current detected base href in this page: <code>{{ baseHref() }}</code></p>
    </app-feature-page>
  `,
  styles: [`
    pre { background:#eee; padding:.5rem; font-size:.8rem; overflow:auto; }
  `],
})
export class IndexHtmlOptionsComponent {
  readonly baseHref = signal(
    typeof document !== 'undefined' ? document.baseURI : '(no document)',
  );
  readonly stagingCfg = `"configurations": {
  "staging": {
    "baseHref": "/app/",
    "deployUrl": "https://cdn.example.com/",
    "crossOrigin": "anonymous",
    "subresourceIntegrity": true,
    "outputHashing": "all"
  }
}`;
}
