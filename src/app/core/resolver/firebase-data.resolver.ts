import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FirebaseDataService } from '../services/firebase-data.service';
import { FirebaseData } from '../models/firebase-data.model';

export const firebaseDataResolver: ResolveFn<FirebaseData[]> = (route, state) => {
  console.log('Resolved');
  return inject(FirebaseDataService).fetchProducts();
};
