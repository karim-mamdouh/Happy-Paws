import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User);
  @Output() profileEmitter = new EventEmitter<User>();
  userData = {} as User;
  showErrors: boolean = false; //Flag to show form errors
  detailsForm: FormGroup = this._detailsBuilder.group({
    firstName: [
      '',
      [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
    ], //Should have no whitespaces or numbers and at least 2 letters
    lastName: [
      '',
      [Validators.required, Validators.pattern(/^[\S][A-Za-z]{2,}$/)],
    ], //Should have no whitespaces or numbers and at least 2 letters
    userName: [
      '',
      [Validators.required, Validators.pattern(/^[\S][A-Za-z0-9]{5,}$/)],
    ], //Should have no whitespaces and at least 5 characters
    phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
  });

  get controlValidation() {
    return this.detailsForm.controls;
  }

  constructor(
    private _detailsBuilder: FormBuilder,
    private _messageService: MessageService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user.subscribe((res) => {
      this.userData = res;
      this.detailsForm.controls['firstName'].setValue(this.userData.firstName);
      this.detailsForm.controls['lastName'].setValue(this.userData.lastName);
      this.detailsForm.controls['phoneNumber'].setValue(
        this.userData.phoneNumber
      );
      this.detailsForm.controls['userName'].setValue(this.userData.userName);
    });
  }
  //Resets form data on destroy
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

  //Send change password email function
  changePassword() {
    this._authService
      .changePassword(this.userData.email)
      .then((response) => {
        this._messageService.add({
          key: 'changePassword',
          severity: 'success',
          summary: 'Forget your password?',
          detail:
            'No worries! we will send you a reset password link, follow link to reset your password',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //On confirm
  onConfirm() {
    this._messageService.clear('confirm');
    this.userData.firstName = this.detailsForm.value['firstName'];
    this.userData.lastName = this.detailsForm.value['lastName'];
    this.userData.userName = this.detailsForm.value['userName'];
    this.userData.phoneNumber = this.detailsForm.value['phoneNumber'];
    this.profileEmitter.emit(this.userData);
  }
  //On closing window
  onReject() {
    this._messageService.clear('confirm');
  }
  showConfirm() {
    this._messageService.clear();
    this._messageService.add({
      key: 'confirm',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });
  }
}
