import { Component , Input, OnChanges} from '@angular/core';
import { ProductsCarouselComponent } from '../../shared/products-carousel/products-carousel.component';
import { ButtonComponent } from '../../shared/buttom/button.component';
import { FirebaseData } from '../../models/firebase-data.model';

@Component({
  selector: 'app-home-products-section',
  standalone: true,
  imports: [ProductsCarouselComponent, ButtonComponent],
  templateUrl: './home-products-section.component.html',
  styleUrl: './home-products-section.component.css'
})
export class HomeProductsSectionComponent implements OnChanges{
  @Input() sectionTittle:string = '';
  @Input() products: FirebaseData[] = [];

  ngOnChanges() {
    if(this.products.length> 0){
      console.log(this.products)
    }
  }
}
