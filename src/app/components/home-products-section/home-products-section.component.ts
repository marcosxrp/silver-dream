import { Component , Input} from '@angular/core';
import { ProductsCarouselComponent } from '../../shared/products-carousel/products-carousel.component';
import { ButtonComponent } from '../../shared/buttom/button.component';

@Component({
  selector: 'app-home-products-section',
  standalone: true,
  imports: [ProductsCarouselComponent, ButtonComponent],
  templateUrl: './home-products-section.component.html',
  styleUrl: './home-products-section.component.css'
})
export class HomeProductsSectionComponent {
  @Input() sectionTittle:string = '';
}
