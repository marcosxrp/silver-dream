import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseData } from '../models/firebase-data.model';
import { tap , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private databaseUrl: string = `https://silver-dream-default-rtdb.firebaseio.com/products.json`;
  private productsSubject: BehaviorSubject<FirebaseData[]> = new BehaviorSubject<FirebaseData[]>([]);

  http = inject(HttpClient)

  fetchProducts(): Observable<FirebaseData[]>{
    return this.http.get<FirebaseData[]>(this.databaseUrl).pipe(
      map(data => Object.values(data)),
      tap((dataArray: FirebaseData[]) => this.productsSubject.next(dataArray))
    );
  }

  get products$(): Observable<FirebaseData[]> {
    return this.productsSubject.asObservable();
  }
}
