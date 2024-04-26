// Responsible for receive and display the products and manage the click of the edit button

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FirebaseDataService } from '../../../core/services/firebase-data.service';
import { Product } from '../../../core/models/product.model';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit, OnDestroy{
  // Injections
  private firebaseService = inject(FirebaseDataService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  // Variables
  private MySub!: Subscription;
  protected products: Product[] = [];

  ngOnInit() {
    // subscribe and store the products
    this.MySub = this.firebaseService.products$.subscribe(products => this.products = products);
  }

  editProduct(product: Product) {
    // select the product, and navigate to the edit product page
    this.adminService.SelectedProduct.next(product);
    this.adminService.editButtonClicked = true;
    this.router.navigate([`admin/edit-product/${product.id}`]);
  }

  ngOnDestroy() {
    this.MySub.unsubscribe();
  }
}
