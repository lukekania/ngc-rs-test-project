import { Component, HostBinding, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-host-bindings',
  template: `
    <h2>#58 &#64;HostListener / &#64;HostBinding extraction</h2>
    <p>Target forms exercised on host: bare property, <code>attr.*</code>, <code>style.*</code>, <code>style.*.px</code>, <code>class.*</code>.</p>
    <p>Click anywhere in this component to bump count.</p>
    <p>Resize the window — <code>width</code> host attribute updates.</p>
    <p>Press <kbd>a</kbd> to toggle the <code>.is-active</code> class.</p>

    <ul>
      <li>clicks: {{ clicks() }}</li>
      <li>last key: {{ lastKey() }}</li>
      <li>width attr: {{ innerW() }}</li>
    </ul>
  `,
  styles: [`
    :host { display:block; padding:1rem; border:2px solid #888; outline:none; }
    :host(.is-active) { background:#c8e6c9; }
  `],
})
export class HostBindingsComponent {
  readonly clicks = signal(0);
  readonly lastKey = signal('');
  readonly innerW = signal(window.innerWidth);
  readonly isActive = signal(false);
  readonly padPx = signal(16);

  @HostBinding('id') hostId = 'host-bindings-demo';
  @HostBinding('attr.data-clicks') get clicksAttr() { return this.clicks(); }
  @HostBinding('attr.data-width') get widthAttr() { return this.innerW(); }
  @HostBinding('style.borderColor') get borderColor() { return this.isActive() ? 'limegreen' : '#888'; }
  @HostBinding('style.padding.px') get paddingPx() { return this.padPx(); }
  @HostBinding('class.is-active') get activeClass() { return this.isActive(); }
  @HostBinding('tabIndex') tabIndex = 0;

  @HostListener('click') onClick() {
    this.clicks.update((n) => n + 1);
    this.padPx.update((p) => (p === 16 ? 32 : 16));
  }

  @HostListener('window:resize') onResize() {
    this.innerW.set(window.innerWidth);
  }

  @HostListener('keydown', ['$event']) onKey(ev: KeyboardEvent) {
    this.lastKey.set(ev.key);
    if (ev.key === 'a') this.isActive.update((v) => !v);
  }
}
