import { Component , EventEmitter, Input, Output} from '@angular/core';
import { CartProduct } from '../../../core/models/cart-products.model';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() product!: CartProduct;
  @Output() addMoreClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output() removeOneClicked: EventEmitter<void> = new EventEmitter<void>()

  addMore() {
    this.addMoreClicked.emit();
  }

  removeOne() {
    this.removeOneClicked.emit();
  }

  isButtomDisabled() {
    return this.product.cartQuantity === this.product.stock;
  }
}
