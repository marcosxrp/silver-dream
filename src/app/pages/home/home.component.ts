import { Component } from '@angular/core';
import { HomeProductsSectionComponent } from '../../components/home-products-section/home-products-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeProductsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
