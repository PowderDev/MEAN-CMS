import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = localStorage.getItem('auth-token') || ''

  constructor(
    private http: HttpClient
  ) { }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          this.setToken(token)
          localStorage.setItem('auth-token', token)
        })
      )
  }

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/register', user)
      .pipe(
        tap(({ token }) => {
          this.setToken(token)
          localStorage.setItem('auth-token', token)
        })
      )
  }

  logout() {
    this.setToken('')
    localStorage.clear()
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuth(): boolean {
    return !!this.token
  }
}
