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
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User);
  @Output() addressEmitter = new EventEmitter<Address>();
  userAddress = {} as Address;
  showErrors: boolean = false; //Flag to show form errors
  addressForm: FormGroup = this._addressForm.group({
    city: ['', [Validators.required]],
    area: ['', [Validators.required]],
    street: ['', [Validators.required]],
    buildingNumber: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    floor: ['', [Validators.required]],
  });

  get controlValidation() {
    return this.addressForm.controls;
  }

  constructor(private _addressForm: FormBuilder) {}

  ngOnInit(): void {
    this.user.subscribe((res) => {
      if (res.address) {
        this.userAddress = res.address!;
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
  ngOnDestroy(): void {
    this.addressForm.reset();
  }
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
    }
  }
}
