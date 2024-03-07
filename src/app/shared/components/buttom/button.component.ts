import { Component , Input, Inject} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  readonly defaultText: string = 'Ver catálogo completo';
  readonly defaultRoute: string = 'catalog';

  @Input() buttonText: string = this.defaultText;
  @Input() pageRoute: string = this.defaultRoute;

  constructor(private router: Router) {}

  goToPage() {
    if (this.pageRoute === 'finish') {
    } else {
      this.router.navigate([this.pageRoute])
    }
  }
}
