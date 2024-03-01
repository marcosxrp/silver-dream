import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { firebaseDataResolver } from './core/resolver/firebase-data.resolver';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, resolve: {data: firebaseDataResolver}},
  {path: '**', redirectTo: '/home'}
];
