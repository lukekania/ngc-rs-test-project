import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allItems } from '../resolvers/detail.resolver';

@Component({
  selector: 'app-routing-list',
  imports: [RouterLink],
  template: `
    <h3>Items</h3>
    <ul>
      @for (item of items; track item.id) {
        <li>
          <a [routerLink]="['detail', item.id]">{{ item.name }}</a> — {{ item.summary }}
        </li>
      }
    </ul>
    <p><a routerLink="protected">Protected route</a> (guard requires login + feature flag)</p>
  `,
})
export class ListComponent {
  protected readonly items = allItems();
}
