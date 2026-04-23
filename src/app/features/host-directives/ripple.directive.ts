import { Directive, ElementRef, HostBinding, HostListener, inject, output, signal } from '@angular/core';

@Directive({
  selector: '[appRipple]',
})
export class RippleDirective {
  readonly rippled = output<void>();
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly on = signal(false);

  @HostBinding('class.is-rippled')
  get rippledClass() {
    return this.on();
  }

  @HostListener('click') onClick() {
    this.on.set(true);
    this.rippled.emit();
    setTimeout(() => this.on.set(false), 400);
  }
}
