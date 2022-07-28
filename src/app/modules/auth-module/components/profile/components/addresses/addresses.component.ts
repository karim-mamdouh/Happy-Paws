import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {
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

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.addressForm.reset();
  }
  submitAddressForm(): void {
    if (this.addressForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
      console.log(this.addressForm.value);
    }
  }
}
