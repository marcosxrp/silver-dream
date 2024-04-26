// Responsible by the management of the click outside the menu to hide it

import { Directive , ElementRef, Output, EventEmitter, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appClickOutsideMenu]',
  standalone: true
})
export class ClickOutsideMenuDirective {
  // Input and Output
  // Output the event when click outside
  @Output() clickOutside = new EventEmitter<void>();
  // Output make connection to the isMenuVisible in the header to only make the emmit if the menu is visible
  @Input() appClickOutsideMenu:boolean = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    if (this.appClickOutsideMenu) {
      // Check if the click was inside the menu
      const clickInside = this.elRef.nativeElement.contains(targetElement);
      // If dont is inside emit the click outside
      if(!clickInside) {
        this.clickOutside.emit();
      }
    }
  }
}
