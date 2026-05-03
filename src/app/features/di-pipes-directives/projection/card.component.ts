import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <article class="card">
      <header><ng-content select="[card-header]" /></header>
      <section class="body"><ng-content /></section>
      <footer><ng-content select="[card-footer]" /></footer>
    </article>
  `,
  styles: [
    `
      .card {
        border: 1px solid #cfd8dc;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
      }
      header {
        background: #eceff1;
        padding: 0.5rem 0.75rem;
        font-weight: 600;
      }
      .body {
        padding: 0.75rem;
      }
      footer {
        border-top: 1px solid #eceff1;
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
        color: #607d8b;
      }
    `,
  ],
})
export class CardComponent {}
