import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { firebaseDataResolver } from './core/resolver/firebase-data.resolver';
import { CartComponent } from './pages/cart/cart.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, resolve: {data: firebaseDataResolver}},
  {path: 'catalog', component: CatalogComponent, resolve: {data: firebaseDataResolver}},
  {path: 'about', component: AboutComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', redirectTo: '/home'}
];
