import { Component , Input, inject} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  // Injections
  private router = inject(Router);

  // Variables
  readonly defaultText: string = 'Ver catálogo completo';
  readonly defaultRoute: string = 'catalog';

  // Inputs
  @Input() buttonText: string = this.defaultText;
  @Input() pageRoute: string = this.defaultRoute;
  @Input() isDisabled: boolean = false;

  // button to navigate only if the pageRoute is not 'finish'
  goToPage() {
    if (this.pageRoute === 'finish') {
    } else {
      this.router.navigate([this.pageRoute])
    }
  }
}
