import { Component } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-issue-149-poll',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="dev-server poll"
      groupLabel="Dev server"
      description="Polling watch mode for filesystems where notify-style events don't fire reliably (NFS, some Docker bind-mounts, WSL crossing the Windows/Linux boundary)."
      [issue]="149"
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>What:</strong> instead of subscribing to filesystem events, the watcher polls
          for mtime changes at the configured interval. Slower but works on filesystems where
          inotify/FSEvents/ReadDirectoryChangesW don't deliver events.
        </p>
        <p>
          <strong>Current ngc-rs state:</strong> silently dropped — affected users can't use
          ngc-rs serve at all on those filesystems.
        </p>
        <p>
          <strong>Why it matters:</strong> Docker bind-mount workflows are common; NFS-shared
          source trees still exist; WSL bridge filesystems are notoriously flaky.
        </p>
      </ng-container>

      <h3>angular.json + CLI</h3>
      <pre><code>"serve": &#123;
  "options": &#123;
    "poll": 2000
  &#125;
&#125;

# or
ng serve --poll=2000</code></pre>

      <h3>Verification</h3>
      <ul>
        <li><code>ng serve --poll=2000</code> works on a Docker bind-mount that doesn't deliver inotify events.</li>
        <li>Implementation candidate: <code>notify</code>'s <code>PollWatcher</code> backend (already in the dep tree).</li>
        <li>Default off (use the platform's native event backend).</li>
      </ul>
    </app-feature-page>
  `,
  styles: [`pre { background: #263238; color: #eceff1; padding: 0.75rem; border-radius: 4px; overflow-x: auto; }`],
})
export class Issue149PollComponent {}
