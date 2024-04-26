// Resolver to fetch the products

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FirebaseDataService } from '../services/firebase-data.service';
import { Product } from '../models/product.model';

export const firebaseDataResolver: ResolveFn<Product[]> = (route, state) => {
  console.log('Resolved');
  return inject(FirebaseDataService).fetchProducts();
};
