import { Component , EventEmitter, Input, Output} from '@angular/core';
import { CartProduct } from '../../../core/models/cart-products.model';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
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
export class CartProductComponent {
  @Input() product!: CartProduct;
  @Output() addMoreClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output() removeOneClicked: EventEmitter<void> = new EventEmitter<void>()

  protected addMoreAnimationState: string = 'normal';
  protected removeOneAnimationState: string = 'normal';

  addMore() {
    this.toggleAddMoreAnimationState();
    this.addMoreClicked.emit();
  }

  removeOne() {
    this.toggleRemoveOneAnimationState();
    this.removeOneClicked.emit();
  }

  isButtonDisabled() {
    return this.product.cartQuantity === this.product.stock;
  }

  toggleAddMoreAnimationState() {
    this.addMoreAnimationState = 'scaled';
    setTimeout(() => this.addMoreAnimationState = 'normal', 100);
  }

  toggleRemoveOneAnimationState() {
    this.removeOneAnimationState = 'scaled';
    setTimeout(() => this.removeOneAnimationState = 'normal', 100);
  }
}
