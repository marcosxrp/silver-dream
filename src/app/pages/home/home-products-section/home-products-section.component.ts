import { Component , Input} from '@angular/core';
import { ProductsCarouselComponent } from '../products-carousel/products-carousel.component';
import { ButtonComponent } from '../../../shared/components/buttom/button.component';
import { FirebaseData } from '../../../core/models/firebase-data.model';

@Component({
  selector: 'app-home-products-section',
  standalone: true,
  imports: [ProductsCarouselComponent, ButtonComponent],
  templateUrl: './home-products-section.component.html',
  styleUrl: './home-products-section.component.css'
})
export class HomeProductsSectionComponent{
  @Input() sectionTittle:string = '';
  @Input() products: FirebaseData[] = [];
}
