import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1>ngc-rs Angular 21 test bed</h1>
    <p>One route per open v0.7.x issue. Build with <code>ng build</code> and again
       with <code>ngc-rs build</code>, then diff or run both <code>dist/</code>s in a browser.</p>
    <ol class="grid">
      <li><a routerLink="/signals">#55 signal APIs</a></li>
      <li><a routerLink="/defer">#56 &#64;defer</a></li>
      <li><a routerLink="/host-directives">#57 hostDirectives</a></li>
      <li><a routerLink="/host-bindings">#58 &#64;HostListener / &#64;HostBinding</a></li>
      <li><a routerLink="/animations">#59 animation trigger syntax</a></li>
      <li><a routerLink="/svg">#60 SVG / MathML namespace</a></li>
      <li><a routerLink="/scss">#61 SCSS component styles</a></li>
      <li><a routerLink="/i18n">#62 i18n / ICU / $localize</a></li>
      <li><a routerLink="/package-imports">#63 package.json imports (#subpath)</a></li>
      <li><a routerLink="/exports-conditions">#64 exports conditional resolution</a></li>
      <li><a routerLink="/service-worker">#65 service worker</a></li>
      <li><a routerLink="/web-worker">#66 web worker</a></li>
      <li><a routerLink="/index-html-options">#67 baseHref / deployUrl / crossOrigin / SRI</a></li>
    </ol>
  `,
  styles: [`
    .grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:.5rem; padding-left:1rem; }
    a { text-decoration:none; padding:.5rem; background:#eceff1; border-radius:4px; display:block; }
    a:hover { background:#cfd8dc; }
  `],
})
export class HomeComponent {}
