import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Animal } from 'src/app/interfaces/adoption';
import { Address, User } from 'src/app/interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { MyPetsComponent } from './components/my-pets/my-pets.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = {} as User; // User object holding user data from database
  @ViewChild(AccountDetailsComponent) private _profile =
    {} as AccountDetailsComponent; // Profile object to access profile observable and update it
  @ViewChild(AddressesComponent) private _address = {} as AddressesComponent; // Address object to access address observable and update it
  @ViewChild(MyPetsComponent) private _pet = {} as MyPetsComponent; // Pet object to access mypet observable and update it

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Fetches user profile from database and send it to all childeren
    this._authService
      .fetchUserProfile(localStorage.getItem('userID')!)
      .subscribe((response) => {
        this.user = response as User;
        this._profile.user.next(this.user);
        this._address.user.next(this.user);
        this._pet.user.next(this.user);
      });
  }
  // Function called when user profile is updated to update it in database
  profileUpdated(event: User): void {
    this.user = event;
    this._authService
      .saveUserToFireStore(this.user)
      .then(() => {
        this.showSuccessToast();
      })
      .catch(() => {
        this.showErrorToast();
      });
  }
  // Function called when user clicks on change password in child to send password reset email
  changePassword(): void {
    this._authService
      .changePassword(this.user.email)
      .then(() => {
        this.showSuccessToast(
          'Forget your password?',
          'No worries! we will send you a reset password link, follow link to reset your password'
        );
      })
      .catch(() => {
        this.showErrorToast(
          'Error sending password reset email, please contact support!'
        );
      });
  }
  // Function called when user modifys/adds address in child, then updates database
  addressUpdated(event: Address): void {
    this.user.address = event;
    this._authService
      .saveUserToFireStore(this.user)
      .then(() => {
        this.showSuccessToast();
      })
      .catch(() => {
        this.showErrorToast();
      });
  }
  // Function called when user modifys/adds pet in child, then updates database
  petUpdated(event: Animal): void {
    this.user.pet = event;
    this._authService
      .saveUserToFireStore(this.user)
      .then(() => {
        this.showSuccessToast();
      })
      .catch(() => {
        this.showErrorToast();
      });
  }
  // Shows succes toast when called
  showSuccessToast(
    summary?: string,
    detail: string = 'Account updated successfully!'
  ): void {
    this._messageService.add({
      key: 'database',
      summary: summary,
      severity: 'success',
      detail: detail,
    });
  }
  // Shows erro toast when called
  showErrorToast(
    detail: string = 'Failed to update account, please contact support!'
  ): void {
    this._messageService.add({
      key: 'error',
      severity: 'error',
      detail: detail,
    });
  }
}
