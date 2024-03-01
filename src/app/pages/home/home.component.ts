import { Component, inject, OnInit} from '@angular/core';
import { HomeProductsSectionComponent } from './home-products-section/home-products-section.component';
import { FirebaseDataService } from '../../core/services/firebase-data.service';
import { FirebaseData } from '../../core/models/firebase-data.model';
import { filter , map} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeProductsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private firebaseService = inject(FirebaseDataService);
  protected newProducts: FirebaseData[] = [];
  protected onSale: FirebaseData[] = [];

  ngOnInit() {
    if (this.firebaseService.products$) {
      this.firebaseService.products$.pipe(
        filter(data => data.length> 0),
        map((data: FirebaseData[]) => {
          this.newProducts = data.filter(product => product.newProduct === true);
          this.onSale = data.filter(product => product.onSale === true);
        })
      ).subscribe();
    };
  }
}
