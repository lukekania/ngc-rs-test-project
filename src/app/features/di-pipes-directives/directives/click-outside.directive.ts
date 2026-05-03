import { DOCUMENT, Directive, ElementRef, OnDestroy, OnInit, inject, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  readonly appClickOutside = output<void>();
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private readonly handler = (ev: Event) => {
    const target = ev.target as Node | null;
    if (target && !this.el.nativeElement.contains(target)) {
      this.appClickOutside.emit();
    }
  };

  ngOnInit() {
    this.doc.addEventListener('click', this.handler, true);
  }

  ngOnDestroy() {
    this.doc.removeEventListener('click', this.handler, true);
  }
}
