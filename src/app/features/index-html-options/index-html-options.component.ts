import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-index-html-options',
  template: `
    <h2>#67 baseHref / deployUrl / crossOrigin / subresourceIntegrity</h2>
    <p>
      <code>angular.json</code> defines a <code>staging</code> configuration that sets all four:
    </p>
    <pre class="cfg">{{ stagingCfg }}</pre>

    <p>Build and diff the emitted <code>index.html</code>:</p>
    <pre class="cmd">ng build --configuration staging && cat dist/test-ng-project/browser/index.html</pre>

    <p>Then swap to <code>ngc-rs build --configuration staging</code> and diff the same file. Expected in the output:</p>
    <ul>
      <li><code>&lt;base href="/app/"&gt;</code></li>
      <li>every injected <code>&lt;script src&gt;</code> / <code>&lt;link href&gt;</code> prefixed with <code>https://cdn.example.com/</code></li>
      <li>every injected tag carries <code>crossorigin="anonymous"</code></li>
      <li>every injected tag carries <code>integrity="sha384-&lt;base64&gt;"</code> — hash must match <code>openssl dgst -sha384 -binary FILE | base64</code></li>
    </ul>

    <p>Current detected base href in this page: <code>{{ baseHref() }}</code></p>
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
