import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  showErrors: boolean = false; //Flag to show form errors
  detailsForm: FormGroup = this._detailsBuilder.group({
    firstName: [
      '',
      [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
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
    userName: [
      '',
      [Validators.required, Validators.pattern(/^[\S][A-Za-z0-9]{5,}$/)],
    ],
    phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
  });

  get controlValidation() {
    return this.detailsForm.controls;
  }

  constructor(private _detailsBuilder: FormBuilder) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.detailsForm.reset();
  }
  submitDetailsForm(): void {
    if (this.detailsForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
      console.log(this.detailsForm.value);
    }
  }
}
