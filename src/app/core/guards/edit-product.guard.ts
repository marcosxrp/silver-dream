// Dont permit go to the edit without selecting a product to edit

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

export const editProductGuard: CanActivateFn = (route) => {
  // Injections
  const adminService = inject(AdminService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  // Check if is in a valid route to edit
  if (id && adminService.editButtonClicked) {
    adminService.editButtonClicked = false;
    return true;
  } else {
    router.navigate(['/admin'])
    return false;
  }
};
