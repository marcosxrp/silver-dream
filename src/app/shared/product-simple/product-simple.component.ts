import { Component , Input} from '@angular/core';
import { FirebaseData } from '../../models/firebase-data.model';
import { Pipe } from '@angular/core';
import { RoundDownPipe } from '../../pipes/round-down.pipe';

@Component({
  selector: 'app-product-simple',
  standalone: true,
  imports: [RoundDownPipe],
  templateUrl: './product-simple.component.html',
  styleUrl: './product-simple.component.css'
})
export class ProductSimpleComponent {
  @Input() product!: FirebaseData;
}
