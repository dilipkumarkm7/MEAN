import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData = { name:'', username:'', email: '', password: '' };
  successMessage = '';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) { }
  onSignup() {
    this.successMessage = '';
    this.errorMessage = '';
    const { name, username, email, password } = this.signupData;
    this.authService.signUp(name, username, email, password).subscribe({
      next: () => {
        this.successMessage = 'Registered Sucessfully';
        this.signupData = { name:'', username:'', email: '', password: '' };
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error:(err)=>{
        this.errorMessage = err.error?.message || 'Signup failed, please try again later';
      }
    })
  }
}
