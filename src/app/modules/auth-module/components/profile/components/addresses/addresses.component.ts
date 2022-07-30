import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Address, User } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User); // User observable to fill userAddress with data from parent
  @Output() addressEmitter = new EventEmitter<Address>(); // Event emiiter to notify parent with changes occured by sending modified object
  userAddress = {} as Address; // Address object to be viewed and editied
  showErrors: boolean = false; //Flag to show form errors
  addressForm: FormGroup = this._addressForm.group({
    city: ['', [Validators.required]],
    area: ['', [Validators.required]],
    street: ['', [Validators.required]],
    buildingNumber: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    floor: ['', [Validators.required]],
  }); // Form controls

  get controlValidation() {
    return this.addressForm.controls;
  }

  constructor(private _addressForm: FormBuilder) {}

  ngOnInit(): void {
    //Subscribes to observable and updates object and form data with new input data
    this.user.subscribe((reposnse) => {
      if (reposnse.address) {
        this.userAddress = reposnse.address!;
        this.addressForm.controls['city'].setValue(this.userAddress.city);
        this.addressForm.controls['area'].setValue(this.userAddress.area);
        this.addressForm.controls['street'].setValue(this.userAddress.street);
        this.addressForm.controls['floor'].setValue(
          this.userAddress.floorNumber
        );
        this.addressForm.controls['buildingNumber'].setValue(
          this.userAddress.buildingNumber
        );
        this.addressForm.controls['apartment'].setValue(
          this.userAddress.apartmentNumber
        );
      }
    });
  }
  //Resets form data and unsubscribe observable on destroy
  ngOnDestroy(): void {
    this.addressForm.reset();
    this.user.unsubscribe();
  }
  //Submit form function, fills userAddress object with new data from form and emits event to parent
  submitAddressForm(): void {
    if (this.addressForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
      this.userAddress.city = this.addressForm.value['city'];
      this.userAddress.area = this.addressForm.value['area'];
      this.userAddress.street = this.addressForm.value['street'];
      this.userAddress.floorNumber = this.addressForm.value['floor'];
      this.userAddress.apartmentNumber = this.addressForm.value['apartment'];
      this.userAddress.buildingNumber =
        this.addressForm.value['buildingNumber'];
      this.addressEmitter.emit(this.userAddress);
      this.showErrors = false;
    }
  }
}
