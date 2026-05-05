import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-141-xliff-v2',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="XLIFF 2.0 i18n"
      groupLabel="i18n & Styling"
      description="ng extract-i18n defaults to XLIFF 2.0 since v9. ngc-rs needs to parse + emit it for both extract-i18n and --localize."
      [issue]="141"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> XLIFF 2.0 has been Angular's recommended i18n format since v9
          and is the default <code>ng extract-i18n</code> output. The schema differs from 1.2:
          root is <code>&lt;xliff version="2.0"&gt;</code>, units are <code>&lt;unit&gt;</code>
          rather than <code>&lt;trans-unit&gt;</code>, and source/target are
          <code>&lt;source&gt;</code>/<code>&lt;target&gt;</code> inside <code>&lt;segment&gt;</code>.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> only XLIFF 1.2 is parsed. Most apps using
          <code>&#64;angular/localize</code> since v9 already have 2.0 files and can't run
          localized builds through ngc-rs.
        </p>
        <p>
          <strong>Why it matters:</strong> any app following Angular's current i18n guide hits
          this wall on day one.
        </p>
      </ng-container>

      <h3>XLIFF 2.0 fixture</h3>
      <pre><code>&lt;xliff version="2.0" srcLang="en" trgLang="de"&gt;
  &lt;file id="messages"&gt;
    &lt;unit id="home.greeting"&gt;
      &lt;segment&gt;
        &lt;source&gt;Welcome to the test project.&lt;/source&gt;
        &lt;target&gt;Willkommen im Testprojekt.&lt;/target&gt;
      &lt;/segment&gt;
    &lt;/unit&gt;
  &lt;/file&gt;
&lt;/xliff&gt;</code></pre>

      <h3>Proposed CLI</h3>
      <pre><code>ngc-rs extract-i18n --format xliff2
ngc-rs build --localize</code></pre>

      <h3>Verification</h3>
      <ul>
        <li>Round-trip: extract from a fixture, translate one message, build, verify the translation appears in the localized bundle.</li>
        <li>The <code>/i18n</code> page in this app is the runtime <code>$localize</code> surface that XLIFF 2.0 extraction would target.</li>
        <li>Refuse anything other than version <code>1.2</code> or <code>2.0</code> with a clear error.</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; font-size: 0.85rem; }`],
})
export class Issue141XliffV2Component {}
