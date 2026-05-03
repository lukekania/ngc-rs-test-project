import { Component, HostBinding, HostListener, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';

@Component({
  selector: 'app-host-bindings',
  imports: [FeaturePageComponent],
  template: `
    <app-feature-page
      title="@HostBinding & @HostListener"
      groupLabel="Components & Templates"
      description="Bare property, attr.*, style.*, style.*.px and class.* host bindings; click/keydown/window:resize listeners."
      [issue]="58"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          Click anywhere on this page to bump count. Resize the window —
          <code>data-width</code> host attribute updates. Press <kbd>a</kbd> to toggle the
          <code>.is-active</code> class on the host.
        </p>
      </ng-container>

      <ul>
        <li>clicks: {{ clicks() }}</li>
        <li>last key: {{ lastKey() }}</li>
        <li>width attr: {{ innerW() }}</li>
      </ul>
    </app-feature-page>
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
