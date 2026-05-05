import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-137-define',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="define: build-time string replacement"
      groupLabel="Build options"
      description="angular.json's define field replaces bare identifiers with literal values at build time. Tree-shake-friendly."
      [issue]="137"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> identifiers listed in <code>angular.json</code>'s
          <code>define</code> map are replaced with their literal value during compilation.
          Common pattern: injecting <code>process.env.NG_APP_API_URL</code> or build-version
          strings without a runtime config fetch.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> the <code>define</code> map is silently
          dropped — values set in <code>angular.json</code> have no effect. ngc-rs already does
          define-substitution for Angular's own <code>ngDevMode</code> flags; user-provided
          defines just aren't read.
        </p>
        <p>
          <strong>Why it matters:</strong> tree-shake of dev-only branches and config baked at
          build time both depend on this.
        </p>
      </ng-container>

      <h3>Live values</h3>
      <p>
        These two values are written in source as bare identifiers
        (<code>__APP_API_URL__</code>, <code>__BUILD_VERSION__</code>) and replaced at build
        time by the <code>define</code> map below.
      </p>
      <table class="grid">
        <tbody>
          <tr><td><code>__APP_API_URL__</code></td><td>{{ apiUrl }}</td></tr>
          <tr><td><code>__BUILD_VERSION__</code></td><td>{{ buildVersion }}</td></tr>
        </tbody>
      </table>

      <h3>angular.json</h3>
      <pre><code>"define": &#123;
  "__APP_API_URL__": "\\"https://api.example.com\\"",
  "__BUILD_VERSION__": "\\"1.0.0-ngref\\""
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>Search the production bundle for <code>__APP_API_URL__</code> — should find zero matches.</li>
        <li>Search for the literal <code>https://api.example.com</code> — should appear inlined where the identifier was used.</li>
        <li>Behavior matches <code>&#64;angular/build:application</code>: JSON-decode-able values are decoded; raw strings stay raw.</li>
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
export class Issue137DefineComponent {
  readonly apiUrl = __APP_API_URL__;
  readonly buildVersion = __BUILD_VERSION__;
}
