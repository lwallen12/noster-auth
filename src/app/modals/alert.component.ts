import { Component, Input } from "@angular/core";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent{
    @Input() message: string;

    constructor(private authService: AuthService, 
        private router: Router) {}


        onLogout() {
            this.authService.logout();
            this.router.navigate(['/']);
          }

          onStayHere() {
              //TODO:
              this.router.navigate(['']);
          }
}