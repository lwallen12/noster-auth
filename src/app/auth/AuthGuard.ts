import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

import * as jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;


        if (currentUser && this.getExpirations())  {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/auth']);
        return false;
    }

    getExpirations() {
        let now = Date.now();
        let decoded = this.decodeThis(this.authenticationService.currentUserValue);
    
        let expiresIn = decoded.exp * 1000;
    
        console.log(Date.now());
        console.log(decoded.exp * 1000);
    
        if (expiresIn > now) {
            return true;
        } else {
            return false;
        }

      }


    decodeThis(token) {
        let decoded = jwt_decode(token);
        return decoded;
      }
}