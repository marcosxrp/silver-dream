// responsible for the form management and interaction with the admin service

import { Component, inject} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { numberValidator } from '../validators/number.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent{
  // Injections
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);

  // Variables
  protected myForm: FormGroup;

  // Form creation
  constructor() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      imgPath: ['', [Validators.required, Validators.minLength(4)]],
      onSale: [false],
      stock: ['', [Validators.required, numberValidator(), Validators.min(1)]],
      value: ['', [Validators.required, numberValidator(), Validators.min(1)]]
    })
  }

  onSubmit() {
    this.adminService.addProductToDatabase({...this.myForm.value, id: 0, newProduct: true});
    this.myForm.reset();
    window.alert('Produto adicionado com sucesso!');
  }
}
