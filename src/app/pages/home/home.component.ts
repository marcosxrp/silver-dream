// Responsible by filtering the products to on sale or new products

import { Component, inject, OnInit, OnDestroy} from '@angular/core';
import { HomeProductsSectionComponent } from './home-products-section/home-products-section.component';
import { FirebaseDataService } from '../../core/services/firebase-data.service';
import { Product } from '../../core/models/product.model';
import { Subscription ,filter , map} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeProductsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  // Injections
  private firebaseService = inject(FirebaseDataService);

  // Variables
  private mySubscription!: Subscription;
  protected newProducts: Product[] = [];
  protected onSale: Product[] = [];

  ngOnInit() {
    // if have the product
    if (this.firebaseService.products$) {
      this.mySubscription = this.firebaseService.products$.pipe(
        filter(data => data.length> 0),
        map((data: Product[]) => {
          // send the products to the respectives variables
          this.newProducts = data.filter(product => product.newProduct === true);
          this.onSale = data.filter(product => product.onSale === true);
        })
      ).subscribe();
    };
  }

  ngOnDestroy() {
    if(this.mySubscription){
      this.mySubscription.unsubscribe();
    }
  }
}
