// Responsible by the input of the product data, and by the function to send the prouct to the cart

import { Component , Input, inject} from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { RoundDownPipe } from '../../pipes/round-down.pipe';
import { CartService } from '../../../core/services/cart.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-simple',
  standalone: true,
  imports: [RoundDownPipe],
  templateUrl: './product-simple.component.html',
  styleUrl: './product-simple.component.css',
  // Animation of the cart button
  animations: [
    trigger('scaleAnimation', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('scaled', style({
        transform: 'scale(1.1)'
      })),
      transition('normal <=> scaled', animate('.1s linear'))
    ])
  ]
})
export class ProductSimpleComponent {
  // Injections
  private cartService = inject(CartService);

  // Variables
  protected animationState: string = 'normal';

  // Inputs
  @Input() product!: Product;

  addToCart(product: Product) {
    this.cartService.addProductToCart(product)
    this.toggleAnimationState();
  }

  // Toggle the animation and go back
  toggleAnimationState() {
    this.animationState = 'scaled'
    setTimeout(() => this.animationState = 'normal', 100)
  }


}
