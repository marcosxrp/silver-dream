import { Component , OnInit, HostListener, inject, OnDestroy} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ClickOutsideMenuDirective } from '../directives/click-outside-menu.directive';
import { Subscription } from 'rxjs';
import { CartServiceService } from '../../core/services/cart-service.service';
import { CartProduct } from '../../core/models/cart-products.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, ClickOutsideMenuDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private cartService = inject(CartServiceService)

  private mySubscription!: Subscription;
  protected isMobile: boolean = false;
  protected isMenuVisible: boolean = false;
  protected cartTotalProducts: number = 0;


  ngOnInit(): void {
    this.checkScreenSize();
    this.mySubscription = this.cartService.products$.subscribe(products => this.cartTotalProducts = products.reduce((total: number, product: CartProduct) => total + product.cartQuantity, 0));
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  changeMenuVisibility(triangle: HTMLImageElement) {
    this.isMenuVisible = !this.isMenuVisible;
    triangle.style.transform = this.isMenuVisible ? 'rotate(180deg)' : 'rotate(0deg)';
  }
}
