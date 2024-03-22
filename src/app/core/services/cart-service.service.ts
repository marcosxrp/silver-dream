import { Injectable} from '@angular/core';
import { CartProduct } from '../models/cart-products.model';
import { BehaviorSubject , Observable, map} from 'rxjs';
import { FirebaseData } from '../models/firebase-data.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService{
  private productsSubject: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);

  constructor() { this.getLocalStorage();}

  get products$(): Observable<CartProduct[]> {
    return this.productsSubject.asObservable();
  }

  get totalCartQuantity$(): Observable<number> {
    return this.products$.pipe(
      map((cartProducts: CartProduct[]) =>
        cartProducts.reduce((total: number, product: CartProduct) => total + product.cartQuantity, 0))
    );
  }

  addProductToCart(product: FirebaseData) {
    const cartProduct: CartProduct =  {...product, cartQuantity: 1 };
    const actualProducts: CartProduct[] = [...this.productsSubject.value];
    const index: number = actualProducts.findIndex(p => p.id === cartProduct.id);

    if(index !== -1) {
      const cartQuantity: number = actualProducts[index].cartQuantity;

      if(cartQuantity + 1 <= actualProducts[index].stock) {
        actualProducts[index].cartQuantity++;
        this.updateProducts([...actualProducts]);
      }
    } else {
      const updatedProducts: CartProduct[] = [...actualProducts, cartProduct];
      this.updateProducts(updatedProducts);
    }
  }

  addOneToCart(product: CartProduct) {
    const actualProducts: CartProduct[] = [...this.productsSubject.value];
    const index: number = actualProducts.findIndex(p => p.id === product.id);

    if(index !== -1) {
      const cartQuantity: number = actualProducts[index].cartQuantity;

      if(cartQuantity + 1 <= actualProducts[index].stock) {
        actualProducts[index].cartQuantity++;
        this.updateProducts([...actualProducts]);
      }
    }
  }

  RemoveOneFromCart(product: CartProduct) {
    const actualProducts: CartProduct[] = [...this.productsSubject.value];
    const index: number = actualProducts.findIndex(p => p.id === product.id);

    if(index !== -1) {
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
    if (productsInLocalStorage) {
      const products: CartProduct[] = JSON.parse(productsInLocalStorage);
      this.productsSubject.next(products);
    }
  }

  attLocalStorage(products: CartProduct[]) {
    const storedProducts = JSON.stringify(products);
    localStorage.setItem('cartProducts', storedProducts);
  }

  updateProducts(UpdatedProducts: CartProduct[]) {
    this.productsSubject.next(UpdatedProducts);
    this.attLocalStorage(UpdatedProducts);
  }
}
