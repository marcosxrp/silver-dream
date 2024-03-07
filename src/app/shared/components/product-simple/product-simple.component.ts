import { Component , Input, inject} from '@angular/core';
import { FirebaseData } from '../../../core/models/firebase-data.model';
import { RoundDownPipe } from '../../pipes/round-down.pipe';
import { CartServiceService } from '../../../core/services/cart-service.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-simple',
  standalone: true,
  imports: [RoundDownPipe],
  templateUrl: './product-simple.component.html',
  styleUrl: './product-simple.component.css',
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
  private cartService = inject(CartServiceService);

  @Input() product!: FirebaseData;
  protected animationState: string = 'normal';

  addToCart(product: FirebaseData) {
    this.cartService.addProductToCart(product)
    this.toggleAnimationState();
  }

  toggleAnimationState() {
    this.animationState = 'scaled'
    setTimeout(() => this.animationState = 'normal', 100)
  }


}
