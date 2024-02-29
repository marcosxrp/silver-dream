import { Component , Input} from '@angular/core';
import { ProductSimpleComponent } from '../product-simple/product-simple.component';
import { FirebaseData } from '../../models/firebase-data.model';

@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [ProductSimpleComponent],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.css'
})
export class ProductsCarouselComponent {
  @Input() products: FirebaseData[] = []

  ngOnChanges() {
    console.log(this.products)
  }

}
