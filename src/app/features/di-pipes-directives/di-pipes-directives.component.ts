import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';
import { APP_CONFIG } from './tokens/app-config.token';
import { FEATURE_FLAGS } from './tokens/feature-flags.token';
import { GreeterService } from './services/greeter.service';
import { HighlightPipe } from './pipes/highlight.pipe';
import { ElapsedPipe } from './pipes/elapsed.pipe';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { CardComponent } from './projection/card.component';

@Component({
  selector: 'app-di-pipes-directives',
  imports: [
    FormsModule,
    FeaturePageComponent,
    HighlightPipe,
    ElapsedPipe,
    AutoFocusDirective,
    ClickOutsideDirective,
    CardComponent,
  ],
  template: `
    <app-feature-page
      title="DI, Pipes, Directives, Projection"
      groupLabel="Components & Templates"
      description="InjectionTokens (incl. multi-providers), services, custom pipes/directives, and content projection."
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          <strong>DI:</strong> <code>APP_CONFIG</code> is a single-value
          <code>InjectionToken</code>; <code>FEATURE_FLAGS</code> is a multi-provider token whose
          consumers receive a flat array of every registered value. <code>GreeterService</code> is a
          tree-shakeable <code>&#64;Injectable(&#123; providedIn: 'root' &#125;)</code> service that
          consumes the token via <code>inject()</code>.
        </p>
        <p>
          <strong>Pipes:</strong> <code>HighlightPipe</code> is pure (recomputes only when inputs
          change); <code>ElapsedPipe</code> is impure and updates each time the demo button bumps
          the tick signal — kept user-driven for deterministic output.
        </p>
        <p>
          <strong>Directives:</strong> <code>AutoFocusDirective</code> uses
          <code>afterNextRender</code> to focus an element on mount;
          <code>ClickOutsideDirective</code> emits a signal-based <code>output()</code> when a
          click lands outside the host.
        </p>
        <p>
          <strong>Projection:</strong> <code>&lt;app-card&gt;</code> exposes named slots via
          <code>ng-content select="[card-header]"</code> and <code>[card-footer]</code> with a
          default slot for the body.
        </p>
      </ng-container>

      <h3>Service + tokens</h3>
      <p>app name: <code>{{ config.appName }}</code></p>
      <p>api base: <code>{{ config.apiBase }}</code></p>
      <p>feature flags ({{ flags.length }}): <code>{{ flags.join(', ') || '(none)' }}</code></p>
      <p>greeting: <strong>{{ greeter.greet('developer') }}</strong></p>

      <h3>Pure pipe — highlight</h3>
      <label>
        search:
        <input [(ngModel)]="term" appAutoFocus />
      </label>
      <p [innerHTML]="text() | highlight: term()"></p>

      <h3>Impure pipe — elapsed</h3>
      <button (click)="bumpTick()">tick (now {{ tick() }})</button>
      <p>created: <code>{{ created | elapsed: tick() }}</code></p>

      <h3>Custom directive — clickOutside</h3>
      <div class="panel" (appClickOutside)="outside.update((n) => n + 1)">
        click inside this box, then anywhere outside to bump:
        <strong>{{ outside() }}</strong>
      </div>

      <h3>Content projection — named slots</h3>
      <app-card>
        <span card-header>Card header</span>
        Body content goes into the default slot.
        <span card-footer>Card footer</span>
      </app-card>
    </app-feature-page>
  `,
  styles: [
    `
      h3 {
        margin-top: 1.5rem;
      }
      .panel {
        padding: 0.75rem;
        background: #fff8e1;
        border: 1px dashed #ffa000;
        border-radius: 4px;
      }
    `,
  ],
})
export class DiPipesDirectivesComponent {
  readonly config = inject(APP_CONFIG);
  readonly flags = inject(FEATURE_FLAGS);
  readonly greeter = inject(GreeterService);

  readonly term = signal('Angular');
  readonly text = signal('Angular features make building Angular apps fun.');
  readonly tick = signal(0);
  readonly outside = signal(0);
  readonly created = Date.now();

  bumpTick() {
    this.tick.update((n) => n + 1);
  }
}
