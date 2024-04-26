import { Component, inject } from '@angular/core';
import { FirebaseDataService } from '../../core/services/firebase-data.service';
import { Product } from '../../core/models/product.model';
import { take} from 'rxjs'
import { ProductSimpleComponent } from '../../shared/components/product-simple/product-simple.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductSimpleComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  // Injections
  private firebaseService = inject(FirebaseDataService)

  // Variables
  protected products: Product[] = [];

  ngOnInit(){
    this.firebaseService.products$.pipe(
      take(1)
    ).subscribe(products => this.products = products);
  }

}
