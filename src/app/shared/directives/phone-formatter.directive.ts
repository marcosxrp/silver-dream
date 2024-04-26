// Format the phone number to the brazilian format

import { Directive , ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPhoneFormatter]',
  standalone: true
})
export class PhoneFormatterDirective {

  constructor(private el: ElementRef) { }

  // Receive the input an format
  @HostListener('input', ['$event']) onInput(event: Event) {
    // Create a variable to the input and remove non numbers
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 0) {
      value = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }

    // return the variable to the input field
    input.value = value;
  }

  // Manage the backspace of the phone number
  @HostListener('keydown.backspace', ['$event']) onBackspace(event: KeyboardEvent) {
    const input = this.el.nativeElement;
    let value = input.value.replace(/\D/g, '');

    // remove 1 number and reformat
    if (value.length > 0) {
      value = value.slice(0, -1);
      value = `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }

    input.value = value;
    event.preventDefault();
  }

}
