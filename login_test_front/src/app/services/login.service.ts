import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly ENDPOINT = 'http://localhost:8080/api/auth/';

  readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(loginRequest: any) {
    let url = this.ENDPOINT + 'login';
    return this.httpClient.post(url, loginRequest, { headers: this.headers });
  }

  register(registerRequest: any) {
    let url = this.ENDPOINT + 'register';
    return this.httpClient.post(url, registerRequest, { headers: this.headers });
  }

  decodeToken(token: string): User {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    
    return {
      username: decoded.sub,
      role: decoded.rn,
    };
  }

  getUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken;
    }
    return null;
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    const expiry = this.getTokenExpirationDate(token);
    return expiry ? expiry < new Date() : true;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }
}
