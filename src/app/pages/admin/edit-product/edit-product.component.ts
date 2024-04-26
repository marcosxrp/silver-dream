// Responsible for the form management and interaction with the admin service

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { AdminService } from '../../../core/services/admin.service';
import { Subscription } from 'rxjs'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { numberValidator } from '../validators/number.validator';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit, OnDestroy{
  // Injections
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder)

  // Variables
  protected editForm!: FormGroup
  private mySub!: Subscription;
  private product!: Product;

  // Creation of the form
  constructor() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      imgPath: ['', [Validators.required, Validators.minLength(4)]],
      onSale: [false],
      newProduct: [false],
      stock: ['', [Validators.required, numberValidator(), Validators.min(1)]],
      value: ['', [Validators.required, numberValidator(), Validators.min(1)]]
    })
  }

  // Set the form based on the selected product
  ngOnInit() {
    this.mySub = this.adminService.selectedProduct$.subscribe(product => {
      this.product = product
      this.editForm.setValue({
        name: product.name,
        imgPath: product.imgPath,
        onSale: product.onSale,
        newProduct: product.newProduct,
        stock: product.stock,
        value: product.value
      })
    });
  }

  onSubmit() {
    this.adminService.editProductInFirebase({...this.editForm.value, id: this.product.id});
    window.alert('Produto editado com sucesoo!')
  }

  deleteProduct() {
    if (confirm('Deseja mesmo deletar esse produto?')) {
      this.adminService.removeProductInFirebase(this.product.id);
    }
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }
}
