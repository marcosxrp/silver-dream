// responsible by the fetch of the products

import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { BehaviorSubject, Observable , tap, map} from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  // Injections
  private http = inject(HttpClient)

  // variables
  public databaseUrl: string = `https://silver-dream-default-rtdb.firebaseio.com/products`;
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private dataFetched: boolean = false;
  public lastId!: number;


  fetchProducts(): Observable<Product[]>{
    // verify if the data was fetched or not
    if(this.dataFetched === false){
      return this.http.get<Product[]>(this.databaseUrl + '.json').pipe(
        map(data => {
          // transform the object in an array
          const dataArray = Object.values(data);
          return dataArray;
        }),
        tap((dataArray: Product[]) => {
          const filteredProducts = dataArray.filter(product => product !== null);
          this.productsSubject.next(filteredProducts);
          this.dataFetched = true;
          this.lastId = filteredProducts.length + 1;
          console.log(filteredProducts)
        })
      );
    } else {
      //Was needed to return the Observable because of the type of fetchProducts()
      return this.productsSubject.asObservable();
    }
  }

  attfetchStatus(){
    this.dataFetched = false;
  }

  get products$(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }
}
