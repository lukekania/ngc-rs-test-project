import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-157-extract-licenses',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="extractLicenses"
      groupLabel="Build options"
      description="extractLicenses: false skips emission of dist/3rdpartylicenses.txt for projects with their own attribution mechanism."
      [issue]="157"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> Angular's builder defaults to writing
          <code>dist/3rdpartylicenses.txt</code> on every production build. Some teams have
          their own license-attribution pipeline and don't want the file in
          <code>dist/</code>.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> the file is always emitted.
          <code>angular.json</code> already declares <code>extractLicenses: false</code> in the
          dev configuration of this project, but ngc-rs ignores it.
        </p>
        <p>
          <strong>Why it matters:</strong> small but visible — auditors and dist-comparison
          tooling notice the extra file.
        </p>
      </ng-container>

      <h3>angular.json (this project, lines around build:configurations:development)</h3>
      <pre><code>"development": &#123;
  "optimization": false,
  "extractLicenses": false,
  "sourceMap": true
&#125;</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>Production build with <code>extractLicenses: false</code> produces a <code>dist/</code> without <code>3rdpartylicenses.txt</code>.</li>
        <li>Default <code>true</code> matches Angular's builder behavior.</li>
        <li>Implementation: skip the <code>generate_third_party_licenses</code> call when the flag is false.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue157ExtractLicensesComponent {}
