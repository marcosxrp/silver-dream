// Just manage the cart and the interaction with the service

import { Component, inject, OnInit , OnDestroy} from '@angular/core';
import { CartProduct } from '../../core/models/cart-product.model';
import { CartProductComponent } from './cart-product/cart-product.component';
import { ButtonComponent } from '../../shared/components/buttom/button.component';
import { CartService } from '../../core/services/cart.service';
import { Subscription, tap} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{
  // Injections
  private cartService = inject(CartService);
  private router = inject(Router);

  // Variables
  private mySubscription!: Subscription;
  protected cartProducts: CartProduct[] = [];
  protected noStockProducts: CartProduct[] = [];

  // Verify if exist products in the cart
  ngOnInit() {
    if(this.cartService.products$) {
      this.mySubscription = this.cartService.products$.pipe(
        tap((products: CartProduct[]) => this.cartProducts = products)
      ).subscribe();
    }
  }

  get totalValue(): number {
    return this.cartProducts.reduce((total, product) => total + (product.value * product.cartQuantity), 0)
  }

  addMoreToCart(product: CartProduct) {
    this.cartService.addOneToCart(product);
  }

  removeOneFromCart(product: CartProduct) {
    this.cartService.RemoveOneFromCart(product)
  }

  finishBuy() {
    this.cartService.ContinueButtonClicked = true;
    this.router.navigate(['/finish-buy']);
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

}
