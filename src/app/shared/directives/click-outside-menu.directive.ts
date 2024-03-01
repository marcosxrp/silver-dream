import { Directive , ElementRef, Output, EventEmitter, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appClickOutsideMenu]',
  standalone: true
})
export class ClickOutsideMenuDirective {
  @Output() clickOutside = new EventEmitter<void>();
  @Input() appClickOutsideMenu:boolean = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    if (this.appClickOutsideMenu) {
      const clickInside = this.elRef.nativeElement.contains(targetElement);
      if(!clickInside) {
        this.clickOutside.emit();
      }
    }
  }
}
