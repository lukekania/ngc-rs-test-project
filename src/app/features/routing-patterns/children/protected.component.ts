import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-routing-protected',
  imports: [RouterLink],
  template: `
    <h3>Protected page</h3>
    <p>Reached only when <code>AuthService.loggedIn()</code> is true.</p>
    <button (click)="auth.logout()">log out</button>
    <p><a routerLink="..">← back to list</a></p>
  `,
})
export class ProtectedComponent {
  protected readonly auth = inject(AuthService);
}
