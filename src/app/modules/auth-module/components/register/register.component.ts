import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showErrors: boolean = false;
  gender = [
    { name: 'Male', value: 'm' },
    { name: 'Female', value: 'f' },
  ]; //List of genders
  registerForm: FormGroup = this._registerFormBuilder.group(
    {
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
      ],
      date: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
      ],
      userName: [
        '',
        [Validators.required, Validators.pattern(/^[\S][A-Za-z0-9]{5,}$/)],
      ], //no spaces,6 char or more,no special character
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})./
          ), //At least one lowercase, at least one uppercase or one number, minimum 6 characters
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: ConfirmPasswordValidator('password', 'confirmPassword'),
    }
  ); //Form group having all inputs with validators

  get controlValidation() {
    return this.registerForm.controls;
  }
  constructor(
    private _registerFormBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.registerForm.reset();
  }

  submitReactiveForm(): void {
    //Check for register form if not valid
    if (this.registerForm.status !== 'INVALID') {
      //Get from local storage the users array if found
      let getUsers = localStorage.getItem('users');
      if (getUsers) {
        //If users found
        let temp = JSON.parse(getUsers as string); //Convert getUsers to object
        temp.push(this.registerForm.value); //Add new user to users array in local storage
        localStorage.setItem('users', JSON.stringify(temp)); //Update users array in local storage
      } else {
        //if users not found in local storage then create one and add new user to it
        localStorage.setItem(
          'users',
          JSON.stringify([this.registerForm.value])
        );
      }
      alert('Account created successfully');
      //Empty form data
      this.registerForm.reset();
      this.showErrors = false;
      this._router.navigate(['/auth/login']);
    } else {
      this.showErrors = true;
    }
  }
}
