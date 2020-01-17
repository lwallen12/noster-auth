import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.css']
})
export class InsideComponent implements OnInit {

  now;
  expiresIn;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getExpirations();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  decodeThis(token) {
    let decoded = jwt_decode(token);
    return decoded;
  }

  getExpirations() {
    this.now = Date.now();
    let decoded = this.decodeThis(this.authService.currentUserValue);

    this.expiresIn = decoded.exp * 1000;

    console.log(Date.now());
    console.log(decoded.exp * 1000);

  }

}
