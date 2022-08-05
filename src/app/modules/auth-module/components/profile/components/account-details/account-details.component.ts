import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  @Input() disableButtons: boolean = false; //Flag to disable all buttons during network requests
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User); // User observable to fill userData with data from parent
  @Output() profileEmitter = new EventEmitter<User>(); // Event emiiter to notify parent with changes occured by sending modified object
  @Output() changePasswordEmitter = new EventEmitter(); // Event emitter to notify parent to change password
  @Output() deleteUserEmitter = new EventEmitter<string>(); // Event emitter to notify parent to remove user account
  confirmedPassword: string = ''; // Input password value for removing account
  userData = {} as User; // User object to be viewed and editied
  showErrors: boolean = false; //Flag to show form errors
  showPasswordDialog: boolean = false; // Flag to show enter password window
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
    phoneNumber: ['', [Validators.maxLength(11), Validators.minLength(11)]],
  }); // Form controls

  get controlValidation() {
    return this.detailsForm.controls;
  }

  constructor(
    private _detailsBuilder: FormBuilder,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    //Subscribes to observable and updates object and form data with new input data
    this.user.subscribe((response) => {
      this.userData = response;
      this.detailsForm.controls['firstName'].setValue(this.userData.firstName);
      this.detailsForm.controls['lastName'].setValue(this.userData.lastName);
      this.detailsForm.controls['phoneNumber'].setValue(
        this.userData.phoneNumber
      );
      this.detailsForm.controls['userName'].setValue(this.userData.userName);
    });
  }
  //Resets form data and unsubscribe observable on destroy
  ngOnDestroy(): void {
    this.user.unsubscribe();
    this.detailsForm.reset();
  }
  // Submit form function, shows confirm toast
  submitDetailsForm(): void {
    if (this.detailsForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
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
  //On toast confirm function, fills userData object with new data from form and emits event to parent
  onToastConfirm(): void {
    this._messageService.clear('confirm');
    this.userData.firstName = this.detailsForm.value['firstName'];
    this.userData.lastName = this.detailsForm.value['lastName'];
    this.userData.userName = this.detailsForm.value['userName'];
    this.userData.phoneNumber = this.detailsForm.value['phoneNumber'];
    this.profileEmitter.emit(this.userData);
    this.showErrors = false;
  }
  //On toast cancel or closing toast function
  onToastReject(): void {
    this._messageService.clear('confirm');
  }
  // Calls changepasswordemitter to notify parent with event
  changePassword(): void {
    this.changePasswordEmitter.emit();
  }
  // Calls deleteUserEmitter to notify parent with event
  deleteAccount(): void {
    this.showPasswordDialog = false;
    this.deleteUserEmitter.emit(this.confirmedPassword);
  }
}
