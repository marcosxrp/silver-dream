import { Component , Input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  readonly defaultText: string = 'Ver catálogo completo';
  readonly defaultRoute: string = 'catalogo';

  @Input() buttonText: string = this.defaultText;
  @Input() pageRoute: string = this.defaultRoute;
}
