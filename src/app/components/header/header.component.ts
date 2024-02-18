import { Component , OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
isMobile: boolean = false;

ngOnInit(): void {
  this.checkScreenSize();
}

@HostListener('window: resize', ['$event'])
onResize(event: any) {
  this.checkScreenSize();
}

checkScreenSize() {
  this.isMobile = window.innerWidth < 768;
}
}
