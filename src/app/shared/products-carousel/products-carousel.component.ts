import { Component } from '@angular/core';
import { ProductSimpleComponent } from '../product-simple/product-simple.component';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [ProductSimpleComponent],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.css'
})
export class ProductsCarouselComponent {

}
