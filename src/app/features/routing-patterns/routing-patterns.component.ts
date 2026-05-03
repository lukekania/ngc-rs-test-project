import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-routing-patterns',
  imports: [FeaturePageComponent, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <app-feature-page
      title="Routing patterns"
      groupLabel="Routing"
      description="Child routes, CanActivate + CanMatch guards, ResolveFn, and signal-based component input binding."
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          The list/detail/protected routes are children of this component, rendered into a child
          <code>&lt;router-outlet&gt;</code>. The detail route uses a
          <code>ResolveFn</code> to look up an item synchronously, and exposes
          <code>:id</code> and the resolved <code>item</code> as signal-based
          <code>input()</code>s thanks to <code>withComponentInputBinding()</code>.
        </p>
        <p>
          The protected route uses a <code>CanActivateFn</code> that redirects to this page when
          unauthenticated, and a <code>CanMatchFn</code> that hides the route entirely if the
          <code>protected-route</code> feature flag is missing.
        </p>
        @if (reason() === 'login-required') {
          <p class="warn">⚠️ Please log in to visit the protected page.</p>
        }
      </ng-container>

      <div class="auth">
        <span>auth state: <strong>{{ auth.loggedIn() ? 'logged in' : 'logged out' }}</strong></span>
        <button (click)="auth.login()" [disabled]="auth.loggedIn()">log in</button>
        <button (click)="auth.logout()" [disabled]="!auth.loggedIn()">log out</button>
      </div>

      <nav class="sub">
        <a routerLink="." routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">List</a>
        <a routerLink="protected" routerLinkActive="active">Protected</a>
      </nav>

      <router-outlet />
    </app-feature-page>
  `,
  styles: [
    `
      .auth {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin: 0.5rem 0 1rem;
        padding: 0.5rem;
        background: #eceff1;
        border-radius: 4px;
      }
      .auth span {
        margin-right: auto;
      }
      .sub {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .sub a {
        padding: 0.3rem 0.6rem;
        background: #f5f5f5;
        border-radius: 4px;
        text-decoration: none;
        color: inherit;
      }
      .sub a.active {
        background: #1976d2;
        color: white;
      }
      .warn {
        color: #ef6c00;
      }
    `,
  ],
})
export class RoutingPatternsComponent {
  readonly reason = input<string>('');
  protected readonly auth = inject(AuthService);
}
