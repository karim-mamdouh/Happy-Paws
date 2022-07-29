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
  user = {} as User;
  @ViewChild(AccountDetailsComponent) profile = {} as AccountDetailsComponent;
  @ViewChild(AddressesComponent) address = {} as AddressesComponent;
  @ViewChild(MyPetsComponent) pet = {} as MyPetsComponent;
  constructor(
    private _authService: AuthService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._authService
      .fetchUserProfile(localStorage.getItem('userID')!)
      .subscribe((response) => {
        this.user = response as User;
        this.profile.user.next(this.user);
        this.address.user.next(this.user);
        this.pet.user.next(this.user);
      });
  }
  profileUpdated(event: User) {
    this.user = event;
    this._authService.saveUserToFireStore(this.user).then((response) => {
      this.showToaster();
    });
  }
  addressUpdated(event: Address) {
    this.user.address = event;
    this._authService.saveUserToFireStore(this.user).then((response) => {
      this.showToaster();
    });
  }
  petUpdated(event: Animal) {
    console.log(event);
    this.user.pet = event;
    this._authService.saveUserToFireStore(this.user).then((response) => {
      this.showToaster();
    });
  }
  showToaster() {
    this._messageService.add({
      key: 'database',
      severity: 'success',
      detail: 'Account updated successfully!',
    });
  }
}
