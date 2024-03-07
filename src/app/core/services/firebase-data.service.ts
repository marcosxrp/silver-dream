import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { BehaviorSubject, Observable , tap, map} from 'rxjs';
import { FirebaseData } from '../models/firebase-data.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private databaseUrl: string = `https://silver-dream-default-rtdb.firebaseio.com/products.json`;
  private productsSubject: BehaviorSubject<FirebaseData[]> = new BehaviorSubject<FirebaseData[]>([]);
  private dataFetched: boolean = false;

  private http = inject(HttpClient)

  fetchProducts(): Observable<FirebaseData[]>{
    if(this.dataFetched === false){
      return this.http.get<FirebaseData[]>(this.databaseUrl).pipe(
        map(data => Object.values(data)),
        tap((dataArray: FirebaseData[]) => {
          this.productsSubject.next(dataArray);
          this.dataFetched = true;
          console.log('passed by service fetch')
        })
      );
    } else {
      return this.productsSubject.asObservable();
    }
  }

  get products$(): Observable<FirebaseData[]> {
    return this.productsSubject.asObservable();
  }
}
