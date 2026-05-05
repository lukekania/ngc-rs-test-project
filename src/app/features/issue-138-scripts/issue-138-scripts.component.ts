import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

interface MarkerWindow extends Window {
  __NG_GLOBAL_SCRIPT_LOADED__?: boolean;
  __NG_GLOBAL_SCRIPT_AT__?: string;
}

@Component({
  selector: 'app-issue-138-scripts',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="scripts array: global script injection"
      groupLabel="Build options"
      description="angular.json's scripts array bundles + injects global JS files (analytics, gtag, web-vitals, Sentry init) into index.html."
      [issue]="138"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> entries in <code>angular.json</code>'s <code>scripts</code>
          array are bundled separately and emitted as <code>&lt;script&gt;</code> tags in
          <code>index.html</code>. Supports a string form (<code>"src/file.js"</code>) and an
          object form (<code>&#123; input, inject, bundleName &#125;</code>).
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> a non-empty <code>scripts</code> array fails
          the build with <code>OptionTranslationError</code> ("scripts option not yet
          supported").
        </p>
        <p>
          <strong>Why it matters:</strong> third-party CDN snippets (Sentry, gtag.js, web-vitals
          IIFE) need to load before the app bundle and stay outside Angular's module graph.
        </p>
      </ng-container>

      <h3>Live check</h3>
      <p>
        <code>src/global-marker.js</code> sets a marker on <code>window</code> when it loads.
        If <code>scripts</code> wired up correctly, the page reads it back here.
      </p>
      <table class="grid">
        <tbody>
          <tr><td><code>__NG_GLOBAL_SCRIPT_LOADED__</code></td><td>{{ loaded }}</td></tr>
          <tr><td><code>__NG_GLOBAL_SCRIPT_AT__</code></td><td>{{ loadedAt }}</td></tr>
        </tbody>
      </table>

      <h3>angular.json</h3>
      <pre><code>"scripts": [
  "src/global-marker.js",
  &#123; "input": "node_modules/web-vitals/dist/web-vitals.iife.js", "bundleName": "vitals" &#125;
]</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>index.html</code> should contain a <code>&lt;script&gt;</code> tag (with <code>defer</code>) referencing the bundled global script.</li>
        <li>Multiple entries with the same <code>bundleName</code> concatenate into one bundle file.</li>
        <li><code>inject: false</code> emits the bundle but skips the <code>&lt;script&gt;</code> tag.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [
    `
      .grid {
        border-collapse: collapse;
        margin: 0.5rem 0 1rem;
      }
      .grid td {
        border: 1px solid #cfd8dc;
        padding: 0.4rem 0.75rem;
      }
      pre {
        background: #263238;
        color: #eceff1;
        padding: 0.75rem;
        border-radius: 4px;
        overflow-x: auto;
      }
    `,
  ],
})
export class Issue138ScriptsComponent {
  private readonly w = window as MarkerWindow;
  readonly loaded = this.w.__NG_GLOBAL_SCRIPT_LOADED__ === true ? 'true (script ran)' : 'false (script did not run)';
  readonly loadedAt = this.w.__NG_GLOBAL_SCRIPT_AT__ ?? '—';
}
