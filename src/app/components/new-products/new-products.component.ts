import { Component } from '@angular/core';
import { ProductsCarouselComponent } from '../../shared/products-carousel/products-carousel.component';

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [ProductsCarouselComponent],
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent {

}
