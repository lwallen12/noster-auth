import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
}

private loginURL = "http://localhost:57096/api/accounts/login";

login(login: Login) {
  return this.http.post<string>(this.loginURL, login, {headers:{ 'Content-Type': 'application/json' }, 
  responseType:'text' as 'json' })
  .pipe(map(user => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', user);

    this.currentUserSubject.next(user);

    console.log(user);

    return user;
  }));
}

logout() {
  // remove user from local storage and set current user to null
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

public get currentUserValue() {

  return this.currentUserSubject.value;
}

  getAuthorizationToken() {
    return "TODO";
  }
}

export class Login {
  email: string;
  password: string;
}
