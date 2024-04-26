// Responsible by add a product to the cart, update quantity and manage the local storage

import { Injectable, inject} from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { BehaviorSubject , Observable, map} from 'rxjs';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  // Injections
  private router = inject(Router);

  // Variables
  private productsSubject: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);
  public ContinueButtonClicked: boolean = false;
  private finishedBuyForm!: BehaviorSubject<FormGroup>;

  // Get the local storage when the service initialize
  constructor() { this.getLocalStorage();}

  get products$(): Observable<CartProduct[]> {
    return this.productsSubject.asObservable();
  }

  get totalCartQuantity$(): Observable<number> {
    // sum the cartQuantity of each product to the total and return it
    return this.products$.pipe(
      map((cartProducts: CartProduct[]) =>
        cartProducts.reduce((total: number, product: CartProduct) => total + product.cartQuantity, 0))
    );
  }

  // this add from the home or the catalog
  addProductToCart(product: Product) {

    // transform the product in a cart product
    const cartProduct: CartProduct =  {...product, cartQuantity: 1 };
    // Create a copy of the products
    const actualProducts: CartProduct[] = [...this.productsSubject.value];
    // find the index of the product in the actualProducts
    const index: number = actualProducts.findIndex(p => p.id === cartProduct.id);

    // verify if the product already exist in the products
    if(index !== -1) {
      const cartQuantity: number = actualProducts[index].cartQuantity;

      // Only add if have stock to it
      if(cartQuantity + 1 <= actualProducts[index].stock) {
        actualProducts[index].cartQuantity++;
        this.updateProducts([...actualProducts]);
      }
    } else {
      // if dont already dont have the product add it
      const updatedProducts: CartProduct[] = [...actualProducts, cartProduct];
      this.updateProducts(updatedProducts);
    }
  }

  // And this update the quantity on the cart component
  addOneToCart(product: CartProduct) {
    const actualProducts: CartProduct[] = [...this.productsSubject.value];
    const index: number = actualProducts.findIndex(p => p.id === product.id);

    // prevent error
    if(index !== -1) {
      const cartQuantity: number = actualProducts[index].cartQuantity;

      // Only add if have stock to it
      if(cartQuantity + 1 <= actualProducts[index].stock) {
        actualProducts[index].cartQuantity++;
        this.updateProducts([...actualProducts]);
      }
    }
  }

  RemoveOneFromCart(product: CartProduct) {
    const actualProducts: CartProduct[] = [...this.productsSubject.value];
    const index: number = actualProducts.findIndex(p => p.id === product.id);

    // prevent error
    if(index !== -1) {
      // if the quantity in the cart equal to 1 remove it from the array, else remove only 1
      if(actualProducts[index].cartQuantity === 1){
        actualProducts.splice(index, 1);
        this.updateProducts([...actualProducts]);
      } else {
        actualProducts[index].cartQuantity--;
        this.updateProducts([...actualProducts]);
      }
    }
  }

  getLocalStorage () {
    const productsInLocalStorage = localStorage.getItem('cartProducts');

    // verify if have products in the local storage
    if (productsInLocalStorage) {
      const products: CartProduct[] = JSON.parse(productsInLocalStorage);
      this.productsSubject.next(products);
    }
  }

  attLocalStorage(products: CartProduct[]) {
    // transform in json before send it to the localStorage
    const storedProducts = JSON.stringify(products);
    localStorage.setItem('cartProducts', storedProducts);
  }

  updateProducts(UpdatedProducts: CartProduct[]) {
    // update the products in the service and call attLocalStorage
    this.productsSubject.next(UpdatedProducts);
    this.attLocalStorage(UpdatedProducts);
  }

  clearLocalStorage(){
    localStorage.clear();
    this.productsSubject.next([]);
  }

  // --------------- Area to the finished buy

  finishBuy(form: FormGroup){
    this.finishedBuyForm = new BehaviorSubject<FormGroup>(form);
    this.router.navigate(['finished-buy']);
  }

  get finishBuyForm(): Observable<FormGroup>{
    return this.finishedBuyForm.asObservable();
  }
}
