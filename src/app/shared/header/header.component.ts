import { Component , OnInit, HostListener, ElementRef} from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ClickOutsideMenuDirective } from '../directives/click-outside-menu.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, ClickOutsideMenuDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
isMobile: boolean = false;
isMenuVisible: boolean = false;

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

changeMenuVisibility(triangle: HTMLImageElement) {
  this.isMenuVisible = !this.isMenuVisible;
  triangle.style.transform = this.isMenuVisible ? 'rotate(180deg)' : 'rotate(0deg)';
}
}
