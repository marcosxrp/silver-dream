// Responsible by the input of the section tittle aind the products

import { Component , Input} from '@angular/core';
import { ProductsCarouselComponent } from '../products-carousel/products-carousel.component';
import { ButtonComponent } from '../../../shared/components/buttom/button.component';
import {Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-home-products-section',
  standalone: true,
  imports: [ProductsCarouselComponent, ButtonComponent],
  templateUrl: './home-products-section.component.html',
  styleUrl: './home-products-section.component.css'
})
export class HomeProductsSectionComponent{
  //Inputs
  @Input() sectionTittle:string = '';
  @Input() products:Product[] = [];
}
