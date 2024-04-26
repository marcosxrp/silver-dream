import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneFormatterDirective } from '../../shared/directives/phone-formatter.directive';
import { CartService } from '../../core/services/cart.service';
import { CartProduct } from '../../core/models/cart-product.model';
import { Subscription, tap } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-buy',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PhoneFormatterDirective],
  templateUrl: './finish-buy.component.html',
  styleUrl: './finish-buy.component.css'
})
export class FinishBuyComponent {
  // Injections
  private fb = inject(FormBuilder);
  protected cartService = inject(CartService);
  private router = inject(Router);

  // Variables
  private mySubscription!: Subscription;
  protected cartProducts: CartProduct[] = [];
  protected myForm: FormGroup;
  protected page: number = 1;
  protected brazilStates =[
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espirito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso do Sul",
    "Mato Grosso",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];
  protected installmenOptions = [1,2,3,4,5,6,7,8,9,10,11,12];
  public finishBuyButtonClicked = false;

  // Form generation
  constructor() {
    this.myForm = this.fb.group({
      personalInfo: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        birthDate: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
        email: ['', [Validators.required, Validators.minLength(8)]]
      }),
      address: this.fb.group({
        cep: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', [Validators.required, Validators.minLength(3)]],
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: ['']
      }),
      payment: this.fb.group({
        paymentMethod: ['', Validators.required],
        confirmationCode: [''],
        name: ['', Validators.minLength(2)],
        cardNumber: ['', [Validators.maxLength(6), Validators.minLength(6)]],
        cvc: ['', [Validators.maxLength(2), Validators.minLength(2)]],
        installment: ['', Validators.required]
      })
    })
  }

  ngOnInit() {
    if(this.cartService.products$) {
      this.mySubscription = this.cartService.products$.pipe(
        tap((products: CartProduct[]) => this.cartProducts = products)
      ).subscribe();
    }
  }

  get totalValue(): number {
    return this.cartProducts.reduce((total, product) => total + (product.value * product.cartQuantity), 0)
  }

  isFormValid(){
    switch (this.page) {
      case 1:
        return this.myForm.get('personalInfo')?.valid;
      case 2:
        return this.myForm.get('address')?.valid;
      default:
        return false;
    }
  }

  resetForm(){
    this.myForm.controls['payment'].get('confirmationCode')?.setValue("");
    this.myForm.controls['payment'].get('name')?.setValue("");
    this.myForm.controls['payment'].get('cardName')?.setValue("");
    this.myForm.controls['payment'].get('cvc')?.setValue("");
    this.myForm.controls['payment'].get('installment')?.setValue("");
  }

  returnPage(){
    if(this.page > 1)
    this.page--;
  }

  nextPage(){
    this.page++;
  }

  checkFinishButton(){
    if(this.myForm.controls['payment'].value['paymentMethod'] === ''){
      return 1
    }
    if((this.myForm.controls['payment'].value['paymentMethod'] === 'pix') && (this.myForm.controls['payment'].value['confirmationCode'] !== '1234')){
      return 1
    }
    if((this.myForm.controls['payment'].value['paymentMethod'] === 'card') && ((this.myForm.controls['payment'].get('name')?.invalid || this.myForm.controls['payment'].value['name'] === '') || (this.myForm.controls['payment'].get('cvc')?.invalid || this.myForm.controls['payment'].value['cvc'] === '') || (this.myForm.controls['payment'].get('cardNumber')?.invalid || this.myForm.controls['payment'].value['cardNumber'] === '') || (this.myForm.controls['payment'].get('installment')?.invalid || this.myForm.controls['payment'].value['installment'] === ''))){
      return 1
    }
    return 0
  }

  finish(){
    this.cartService.finishBuy(this.myForm);
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }
}
