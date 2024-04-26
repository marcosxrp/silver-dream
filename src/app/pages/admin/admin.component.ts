import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet , RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
