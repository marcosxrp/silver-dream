import { Component, inject, OnInit, OnDestroy} from '@angular/core';
import { HomeProductsSectionComponent } from './home-products-section/home-products-section.component';
import { FirebaseDataService } from '../../core/services/firebase-data.service';
import { FirebaseData } from '../../core/models/firebase-data.model';
import { Subscription ,filter , map} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeProductsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  private firebaseService = inject(FirebaseDataService);
  private mySubscription!: Subscription;
  protected newProducts: FirebaseData[] = [];
  protected onSale: FirebaseData[] = [];

  ngOnInit() {
    if (this.firebaseService.products$) {
      this.mySubscription = this.firebaseService.products$.pipe(
        filter(data => data.length> 0),
        map((data: FirebaseData[]) => {
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
