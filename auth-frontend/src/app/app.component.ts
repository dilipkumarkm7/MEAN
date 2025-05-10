import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu(){
    this.menuOpen = false;
  }
}
