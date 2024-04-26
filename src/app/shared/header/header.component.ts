import { Component , OnInit, HostListener, inject, OnDestroy} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ClickOutsideMenuDirective } from '../directives/click-outside-menu.directive';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { CartProduct } from '../../core/models/cart-product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, ClickOutsideMenuDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  // Injections
  private cartService = inject(CartService)

  // Variables
  private mySubscription!: Subscription;
  protected isMobile: boolean = false;
  protected isMenuVisible: boolean = false;
  protected cartTotalProducts: number = 0;

  // Check the screen size to know if is mobile and check the cart quantity
  ngOnInit(): void {
    this.checkScreenSize();
    // subscribe to cart service and make a reduce in each cartQuantity to add in carTotalProducts
    this.mySubscription = this.cartService.products$.subscribe(products => this.cartTotalProducts = products.reduce((total: number, product: CartProduct) => total + product.cartQuantity, 0));
  }

  // Check the resize to know if the new width is mobile
  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  // Change the variable isMenuVisible true<=>false, and rotate the menu triangle
  changeMenuVisibility(triangle: HTMLImageElement) {
    this.isMenuVisible = !this.isMenuVisible;
    triangle.style.transform = this.isMenuVisible ? 'rotate(180deg)' : 'rotate(0deg)';
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}

