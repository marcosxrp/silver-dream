import { Directive , ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[appClickOutsideMenu]',
  standalone: true
})
export class ClickOutsideMenuDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    const clickInside = this.elRef.nativeElement.contains(targetElement);
    if(!clickInside) {
      this.clickOutside.emit();
    }
  }

}
