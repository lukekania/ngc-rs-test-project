import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  readonly appTooltipText = input<string>('');
  private readonly host = inject(ElementRef<HTMLElement>);

  @HostListener('mouseenter') onEnter() {
    this.host.nativeElement.setAttribute('title', this.appTooltipText());
  }
}
