import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UploadService } from 'src/app/services/upload.service';
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
  disableChildButtons: boolean = false; // Flag to disable child buttons on network requests
  @ViewChild(AccountDetailsComponent) private _profile =
    {} as AccountDetailsComponent; // Profile object to access profile observable and update it
  @ViewChild(AddressesComponent) private _address = {} as AddressesComponent; // Address object to access address observable and update it
  @ViewChild(MyPetsComponent) private _pet = {} as MyPetsComponent; // Pet object to access mypet observable and update it

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _fireStore: DatabaseService,
    private _uploader: UploadService
  ) {}

  ngOnInit(): void {
    // Fetches user profile from database and send it to all childeren
    this._authService
      .fetchUserProfile(localStorage.getItem('userID')!)
      .subscribe(
        (response) => {
          this.user = response as User;
          this._profile.user.next(this.user);
          this._address.user.next(this.user);
          this._pet.user.next(this.user);
        },
        () => {
          this.showErrorToast('Failed to fetch data, please contact support');
        }
      );
  }
  // Function called when user profile is updated to update it in database
  profileUpdated(event: User): void {
    this.disableChildButtons = true;
    this.user = event;
    if (this.user.phoneNumber === undefined) {
      this.user.phoneNumber = '';
    }
    this._authService
      .saveUserToFireStore(this.user)
      .then(() => {
        this.showSuccessToast();
        this.disableChildButtons = false;
      })
      .catch(() => {
        this.showErrorToast();
        this.disableChildButtons = false;
      });
  }
  // Function called when user uploads pet image
  uploadImage(event: File): void {
    this._uploader.uploadFile(event).subscribe(
      (response) => {
        response.subscribe((url) => {
          this._pet.filePath = url;
          this.showSuccessToast('', 'Image uploaded successfully');
        });
      },
      () => {
        this.showErrorToast('Failed to upload image');
      }
    );
  }
  // Upload pet to collection and then user profile
  petAdded(event: User) {
    this.disableChildButtons = true;
    this.user = event;
    if (this.user.phoneNumber === undefined) {
      this.user.phoneNumber = '';
    }
    if (this.user.pet && this.user.pet.id === undefined) {
      this.user.pet.id = this._fireStore.generateID();
    }
    this._fireStore
      .addAnimal(this.user?.pet!)
      .then(() => {
        return this._authService.saveUserToFireStore(this.user);
      })
      .then(() => {
        this.showSuccessToast();
        this.disableChildButtons = false;
      })
      .catch(() => {
        this.showErrorToast();
        this.disableChildButtons = false;
      });
  }
  // Function called when user clicks on change password in child to send password reset email
  changePassword(): void {
    this._authService
      .changePassword(this.user.email)
      .then(() => {
        this.showSuccessToast(
          'Forget your password?',
          'No worries! we will send you a reset password link, follow link to reset your password (please check your spam)'
        );
      })
      .catch(() => {
        this.showErrorToast(
          'Error sending password reset email, please contact support!'
        );
      });
  }
  // Function called when user clicks on remove account in child
  deleteUser(password: string): void {
    this._authService
      .login(this.user.email, password)
      .then(() => {
        return this._authService.removeUser();
      })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        window.location.href = '/';
      })
      .catch(() => {
        this.showErrorToast(
          'Failed to remove account, please contact support!'
        );
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
