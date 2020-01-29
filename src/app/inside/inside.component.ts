import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import * as jwt_decode from "jwt-decode";
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.css']
})
export class InsideComponent implements OnInit, OnDestroy {

  now;
  expiresIn;
  authorizedTime;

  uselessMessage = "This is a useless message just for practice from within setTimeout!";

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  isIdle: boolean = false;


  constructor(private authService: AuthService, 
              private router: Router, 
              private idle: Idle, 
              private keepalive: Keepalive) {
                
              // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    
    this.onIdleEnd();
    this.onIdleStart();
    this.onTimeoutWarning();
    this.onTimeout();

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.idle.watch();


               }

      
onIdleEnd() {
      this.idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
      this.isIdle = false;
    });
  }

  onIdleStart() {
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      //this.childModal.show();
      //alert("You are idle!");
      this.isIdle = true;
  });
  }

  onTimeoutWarning() {
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });
  }

  onTimeout() {
  this.idle.onTimeout.subscribe(() => {
    this.idleState = 'Timed out!';
    this.timedOut = true;
    console.log(this.idleState);
    this.onLogout();
  });
}

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
  }


  ngOnInit() {
    this.getExpirations();

    this.mySetTimeout();
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

    this.authorizedTime = this.expiresIn - this.now;

    console.log(Date.now());
    console.log(decoded.exp * 1000);

  }

  //You need to use ArrowFunction ()=> to preserve this context within setTimeout
  mySetTimeout() {
      
    console.log("Hello from mySetTimeout before setTimeout in code");
    setTimeout (() => {
         console.log(this.uselessMessage);
      }, this.authorizedTime); //chanage to 3000 if you wanna see it quicker that the 15 min
 
    console.log("Hello from mySetTimeout after setTimeout in code");
  }

  ngOnDestroy(): void {
    this.idle.stop();
  }


  /*var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 3000)
    }
};*/

//https://blog.bitsrc.io/how-to-implement-idle-timeout-in-angular-af61eefdb13b
//idle log out

//https://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration 
//Great starting point on auto-refresh

//https://medium.com/@kedren.villena/refresh-jwt-token-with-asp-net-core-c-25c2c9ee984b

//http://ericsmasal.com/2018/06/14/refresh-tokens-in-asp-net-core-2-api/

//https://fullstackmark.com/post/19/jwt-authentication-flow-with-refresh-tokens-in-aspnet-core-web-api
//Looks to be good and in depth

} 


