import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  signUp(name:string, username:string, email: string, password: string){
    const body = {name, username, email, password};
    return this.http.post(`${environment.apiUrl}/api/signup`, body);
  }
  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post<{ token: string }>(`${environment.apiUrl}/api/signin`, body);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
