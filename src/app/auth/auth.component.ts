import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService, Login } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  loginData: Login = {
    email: "",
    password: ""
   };

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/inside']);
    }
  }

  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(8)])
  // });

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

  switchToSignUp() {
    alert("sorry signing up is not an option at the moment!");
  }


  onSubmit() {
    this.submitted = true;
    this.loginData.email = this.f.username.value;
    this.loginData.password = this.f.password.value;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginData)
        .pipe(first())
        .subscribe(
            data => {
                //this.router.navigate([this.returnUrl]);
                this.router.navigate(['/inside']);
            },
            error => {
                this.error = error.message;
                this.loading = false;
            });
}

}
