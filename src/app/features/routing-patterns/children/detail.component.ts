import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Item {
  id: string;
  name: string;
  summary: string;
}

@Component({
  selector: 'app-routing-detail',
  imports: [RouterLink],
  template: `
    <h3>Detail: {{ id() }}</h3>
    @if (item(); as it) {
      <p><strong>{{ it.name }}</strong></p>
      <p>{{ it.summary }}</p>
    } @else {
      <p>Item not found.</p>
    }
    <p><a routerLink="..">← back to list</a></p>
  `,
})
export class DetailComponent {
  readonly id = input.required<string>();
  readonly item = input<Item | null>(null);
}
