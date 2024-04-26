import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { firebaseDataResolver } from './core/resolver/firebase-data.resolver';
import { CartComponent } from './pages/cart/cart.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ProductsListComponent } from './pages/admin/products-list/products-list.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { editProductGuard } from './core/guards/edit-product.guard';
import { FinishBuyComponent } from './pages/finish-buy/finish-buy.component';
import { finishBuyGuard } from './core/guards/finish-buy.guard';
import { FinishedBuyComponent } from './pages/finished-buy/finished-buy.component';

export const routes: Routes = [
  // default route
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, resolve: {data: firebaseDataResolver}},
  {path: 'catalog', component: CatalogComponent, resolve: {data: firebaseDataResolver}},
  {path: 'cart', component: CartComponent},
  // admin childrens
  {path: 'admin', component: AdminComponent, children: [
    {path: '', redirectTo: 'product-list', pathMatch: 'full'},
    {path: 'product-list', component: ProductsListComponent, resolve: {data: firebaseDataResolver}},
    {path: 'add-product', component: AddProductComponent, resolve: {data: firebaseDataResolver}},
    {path: 'edit-product/:id', component: EditProductComponent, canActivate: [editProductGuard]},
    {path: '**', redirectTo: 'product-list'}
  ]},
  {path: 'finish-buy', component: FinishBuyComponent},
  {path: 'finished-buy', component: FinishedBuyComponent},
  // redirect nonExistant routes
  {path: '**', redirectTo: '/home'}
];
