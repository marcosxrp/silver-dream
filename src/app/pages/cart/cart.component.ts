import { Component, inject, OnInit , OnDestroy} from '@angular/core';
import { CartProduct } from '../../core/models/cart-products.model';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ButtonComponent } from '../../shared/components/buttom/button.component';
import { CartServiceService } from '../../core/services/cart-service.service';
import { Subscription, tap} from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  private mySubscription!: Subscription;
  private cartService = inject(CartServiceService);
  protected cartProducts: CartProduct[] = [];

  ngOnInit() {
    if(this.cartService.products$) {
      this.mySubscription = this.cartService.products$.pipe(
        tap((products: CartProduct[]) => this.cartProducts = products)
      ).subscribe();
    }
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  get totalValue(): number {
    return this.cartProducts.reduce((total, product) => total + (product.value * product.cartQuantity), 0)
  }

  addMoreToCart(product: CartProduct) {
    this.cartService.addOneToCart(product);
    console.log('oiiiii')
  }

  removeOneFromCart(product: CartProduct) {
    this.cartService.RemoveOneFromCart(product)
  }
}
