import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
  @Input() disableButtons: boolean = false; //Flag to disable all buttons during network requests
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User); // User observable to fill userData.address? with data from parent
  @Output() addressEmitter = new EventEmitter<User>(); // Event emiiter to notify parent with changes occured by sending modified object
  userData = {} as User; // User object to be viewed and editied
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
        this.userData = reposnse!;
        this.addressForm.controls['city'].setValue(this.userData.address?.city);
        this.addressForm.controls['area'].setValue(this.userData.address?.area);
        this.addressForm.controls['street'].setValue(
          this.userData.address?.street
        );
        this.addressForm.controls['floor'].setValue(
          this.userData.address?.floorNumber
        );
        this.addressForm.controls['buildingNumber'].setValue(
          this.userData.address?.buildingNumber
        );
        this.addressForm.controls['apartment'].setValue(
          this.userData.address?.apartmentNumber
        );
      }
    });
  }
  //Resets form data and unsubscribe observable on destroy
  ngOnDestroy(): void {
    this.addressForm.reset();
    this.user.unsubscribe();
  }
  //Submit form function, fills userData.address? object with new data from form and emits event to parent
  submitAddressForm(): void {
    if (this.addressForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
      this.userData.address = {
        city: this.addressForm.value['city'],
        area: this.addressForm.value['area'],
        street: this.addressForm.value['street'],
        floorNumber: this.addressForm.value['floor'],
        apartmentNumber: this.addressForm.value['apartment'],
        buildingNumber: this.addressForm.value['buildingNumber'],
      };
      this.addressEmitter.emit(this.userData);
      this.showErrors = false;
    }
  }
}
