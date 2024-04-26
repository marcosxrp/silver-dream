// Responsible by add, edit or remove products

import { Injectable, inject } from '@angular/core';
import { FirebaseDataService } from './firebase-data.service';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService{
  // Injections
  private router = inject(Router)
  private firebaseService = inject(FirebaseDataService);
  private http = inject(HttpClient);

  // Variables
  private firstProduct!: Product;
  public SelectedProduct: BehaviorSubject<Product> = new BehaviorSubject<Product>(this.firstProduct);
  public editButtonClicked: boolean = false;

  constructor() {}

  addProductToDatabase(product: Product) {
    // Fetch products to receive the updated version of the products
    this.firebaseService.attfetchStatus();
    this.firebaseService.fetchProducts().pipe(
      take(1)
    ).subscribe(() => {
      const newId = this.firebaseService.lastId;
      const formData = {
        // Stock and value to number, and define the ID
        ...product,
        stock: +product.stock,
        value: +product.value,
        id: newId
      }
      // Add to the database and att the fetch status to the resolver fetch the new product
      this.http.put(`${this.firebaseService.databaseUrl}/${newId}.json`, formData).subscribe(() => this.firebaseService.attfetchStatus());
    });
  }

  editProductInFirebase(product: Product) {
    // Edit in the database and att the fetch status to the resolver fetch updated products
    this.http.put(`${this.firebaseService.databaseUrl}/${product.id}.json`, product).subscribe(() => this.firebaseService.attfetchStatus())
  }

  removeProductInFirebase(id: number) {
    // Remove in the database and att the fetch status to the resolver fetch updated products
    this.http.delete(`${this.firebaseService.databaseUrl}/${id}.json`).subscribe(() => {
      this.firebaseService.attfetchStatus()
      // After this navigate away
      this.router.navigate(['/admin'])
    });
  }

  get selectedProduct$(): Observable<Product> {
    return this.SelectedProduct.asObservable();
  }
}
