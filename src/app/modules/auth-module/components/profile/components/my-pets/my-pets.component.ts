import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss'],
})
export class MyPetsComponent implements OnInit {
  @Input() disableButtons: boolean = false; //Flag to disable all buttons during network requests
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User); // User observable to fill userData.pet with data from parent
  @Output() petEmitter = new EventEmitter<User>(); // Event emiiter to notify parent with changes occured by sending modified object
  userData = {} as User; // User object to be viewed and editied
  showErrors: boolean = false; //Flag to show form errors
  gender = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
  ]; //List of genders
  petType = [
    { name: 'Cat', value: 'Cat' },
    { name: 'Dog', value: 'Dog' },
    { name: 'Fish', value: 'Fish' },
    { name: 'Bird', value: 'Bird' },
  ]; //List of types
  petForm: FormGroup = this._petBuilder.group({
    petName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    weight: ['', [Validators.required, Validators.min(0.5)]],
    ownerName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ], // Phone number should be exactly 10 digits
    description: ['', [Validators.required]],
  }); // Form controls

  constructor(private _petBuilder: FormBuilder) {}

  get controlValidation() {
    return this.petForm.controls;
  }

  ngOnInit(): void {
    // Wait for data then do action
    this.user.subscribe((response) => {
      if (response.pet) {
        //Fill data from recieved object to form
        this.userData = response;
        this.petForm.controls['petName'].setValue(this.userData.pet?.name);
        this.petForm.controls['type'].setValue({
          name: this.userData.pet?.type,
          value: this.userData.pet?.type,
        });
        this.petForm.controls['gender'].setValue({
          name: this.userData.pet?.gender,
          value: this.userData.pet?.gender,
        });
        this.petForm.controls['birthdate'].setValue(this.userData.pet?.age);
        this.petForm.controls['ownerName'].setValue(
          this.userData.pet?.owner.name
        );
        this.petForm.controls['location'].setValue(
          this.userData.pet?.owner.location
        );
        this.petForm.controls['phoneNumber'].setValue(
          this.userData.pet?.owner.phone
        );
        this.petForm.controls['description'].setValue(
          this.userData.pet?.description
        );
        this.petForm.controls['weight'].setValue(this.userData.pet?.weight);
      }
    });
  }
  //Resets form data and unsubscribe observable on destroy
  ngOnDestroy(): void {
    this.user.unsubscribe();
    this.petForm.reset();
  }
  //Submit form function, fills userData.pet object with new data from form and emits event to parent
  submitPetForm(): void {
    if (this.petForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
      this.userData.pet = {
        name: this.petForm.value['petName'],
        type: this.petForm.value['type']['name'],
        gender: this.petForm.value['gender']['name'],
        age: this.petForm.value['birthdate'],
        owner: {
          name: this.petForm.value['ownerName'],
          location: this.petForm.value['location'],
          phone: this.petForm.value['phoneNumber'],
        },
        description: this.petForm.value['description'],
        weight: this.petForm.value['weight'],
      };
      this.petEmitter.emit(this.userData);
    }
  }
}
