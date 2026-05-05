import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-151-inspect',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server inspect"
      groupLabel="Dev server"
      description="Forward Node's --inspect flag through to dev-server subprocesses. Mostly useful once SSR lands; today this is a quiet pass-through."
      [issue]="151"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> <code>inspect: true</code> or
          <code>inspect: '127.0.0.1:9229'</code> tells the dev server to forward Node's
          <code>--inspect</code> flag to any subprocess it spawns, so a debugger can attach.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently dropped. Low impact today — the only
          Node subprocess ngc-rs spawns is the optional PostCSS/Tailwind invocation, which
          doesn't typically benefit from a debugger. Real value lands once SSR is in.
        </p>
        <p>
          <strong>Why it matters:</strong> stops emitting a "silently overridden" warning so
          users with the option in their angular.json don't get spurious noise.
        </p>
      </ng-container>

      <h3>angular.json</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "inspect": true
  &#125;
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>inspect: true</code> no longer triggers the silently-overridden warning.</li>
        <li>A future SSR implementation can wire it through to the SSR worker process trivially.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue151InspectComponent {}
