import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showErrors: boolean = false; //Flag to show form errors
  loginForm: FormGroup = this._loginFormBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
        ),
      ],
    ], // Should have email format
    password: ['', [Validators.required]], // Password should be entered
  }); //Form group having all inputs with validators

  get controlValidation() {
    return this.loginForm.controls;
  }

  constructor(
    private _loginFormBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {}
  //Restes form on destroy
  ngOnDestroy(): void {
    this.loginForm.reset();
  }
  //Function that logs user in when called
  loginFormSubmit(): void {
    //check login form status => if validators not valid return false
    if (this.loginForm.status === 'INVALID') {
      this.showErrors = true;
      this.showErrorToast('Please enter data correctly!');
    } else {
      //1- Check if the email entered and password are in the database
      //2- Then return the tokenId from the database
      //3- Save the response in the local storage
      //4- Navigate to home page.
      this._authService
        .login(this.loginForm.value['email'], this.loginForm.value['password'])
        .then((response) => {
          //Save user id from firebase in local storage
          localStorage.setItem('userID', `${response.user?.uid}`);
          return response.user?.getIdToken();
        })
        .then((response) => {
          localStorage.setItem('token', `${response}`);
          this.showSuccessToast();
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 1500);
        })
        .catch(() => {
          this.showErrorToast('Wrong email or password');
        });
    }
  }
  //Function that shows success toaster
  showSuccessToast(): void {
    this._messageService.add({
      key: 'Successtoast',
      severity: 'success',
      summary: '',
      detail: 'Welcome back to Happy Paws',
    });
  }
  //Function that shows error toaster
  showErrorToast(errorMsg: string): void {
    this._messageService.add({
      key: 'Errortoast',
      severity: 'error',
      summary: '',
      detail: errorMsg,
    });
  }
}
