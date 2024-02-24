import { Component } from '@angular/core';
import { NewProductsComponent } from '../../components/new-products/new-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
