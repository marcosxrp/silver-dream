// Protect the finish of the buy

import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const finishBuyGuard: CanActivateFn = (route, state) => {
  // Injections
  const router = inject(Router);
  const cartService = inject(CartService);

  // Check if the Continue button was clicked before go to the page
  if (cartService.ContinueButtonClicked) {
    return true;
  } else {
    router.navigate(['/cart'])
    return false
  }
};
