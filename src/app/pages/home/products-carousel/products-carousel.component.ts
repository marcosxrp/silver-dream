// Input of the products

import { Component , Input} from '@angular/core';
import { ProductSimpleComponent } from '../../../shared/components/product-simple/product-simple.component';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [ProductSimpleComponent],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.css'
})
export class ProductsCarouselComponent {
  @Input() products: Product[] = []
}
