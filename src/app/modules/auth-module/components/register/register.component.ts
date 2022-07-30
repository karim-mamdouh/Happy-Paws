import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from './validators/confirm-password.validator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showErrors: boolean = false; //Flag that shows all form errors
  gender = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
  ]; //List of genders
  registerForm: FormGroup = this._registerFormBuilder.group(
    {
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
      ], // No whitespaces or numbers and at least two characters
      date: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
      ], // No whitespaces or numbers and at least two characters
      userName: [
        '',
        [Validators.required, Validators.pattern(/^[\S][A-Za-z0-9]{5,}$/)],
      ], //No spaces,6 char or more,no special character
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
          ),
        ], // Should have email format
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
    private _router: Router,
    private _authService: AuthService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {}
  //Resets form data on destroy
  ngOnDestroy(): void {
    this.registerForm.reset();
  }
  //Function that creates new user in database
  submitReactiveForm(): void {
    //Check for register form if not valid
    if (this.registerForm.status !== 'INVALID') {
      //create user details object
      let user: User = {
        email: this.registerForm.value['email'],
        firstName: this.registerForm.value['firstName'],
        lastName: this.registerForm.value['lastName'],
        birthdate: `${this.registerForm.value['date']}`,
        userName: this.registerForm.value['userName'],
        gender: this.registerForm.value['gender']['name'],
      };
      // 1- save user data in the database,
      // 2- take the id from firebase and save it in the user id defined in the object
      // 3- Navigate to login page
      this._authService
        .register(
          this.registerForm.value['email'],
          this.registerForm.value['password']
        )
        .then((response) => {
          user.id = response.user?.uid;
          return this._authService.saveUserToFireStore(user);
        })
        .then(() => {
          this.showSuccessToast();
          setTimeout(() => {
            this._router.navigate(['/auth/login']);
          }, 1500);
        })
        .catch(() => {
          this.showErrorToast();
        });
    } else {
      this.showErrors = true;
      this.showErrorToast();
    }
  }
  //Function that shows success toast
  showSuccessToast(): void {
    this._messageService.add({
      key: 'Successtoast',
      severity: 'success',
      summary: '',
      detail: 'Account created successfully',
    });
  }
  // Function that shows error toast
  showErrorToast(): void {
    this._messageService.add({
      key: 'Errortoast',
      severity: 'error',
      summary: '',
      detail: 'Please enter data correctly!',
    });
  }
}
