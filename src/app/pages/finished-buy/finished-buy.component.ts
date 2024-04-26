import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CartProduct } from '../../core/models/cart-product.model';
import { Product } from '../../core/models/product.model';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-finished-buy',
  standalone: true,
  imports: [],
  templateUrl: './finished-buy.component.html',
  styleUrl: './finished-buy.component.css'
})
export class FinishedBuyComponent {
  // Injections
  private cartService = inject(CartService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  // Variables
  private mySub!: Subscription;
  private servicesub!: Subscription;
  protected formData!: any;
  protected cartProducts: CartProduct[] = [];

  ngOnInit(){
    this.mySub = this.cartService.finishBuyForm.subscribe(data => this.formData = data);
    if(this.cartService.products$) {
      this.servicesub = this.cartService.products$.pipe(
        take(1),
        tap((products: CartProduct[]) => this.cartProducts = products)
      ).subscribe(() => this.updateStock());
    }

  }

  updateStock(){
    this.cartService.clearLocalStorage();
    this.cartProducts.map(cartProduct => {
      const {cartQuantity, ...newProduct} = cartProduct;
      newProduct.stock -= cartQuantity;
      this.adminService.editProductInFirebase(newProduct);
    })

  }

  goToHomePage(){
    this.router.navigate([''])
  }

  get totalValue(): number {
    return this.cartProducts.reduce((total, product) => total + (product.value * product.cartQuantity), 0)
  }

  ngOnDestroy(){
    if(this.servicesub){
      this.servicesub.unsubscribe();
    }
    if(this.mySub){
      this.mySub.unsubscribe();
    }
  }

}
