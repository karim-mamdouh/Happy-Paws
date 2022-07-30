import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Animal } from 'src/app/interfaces/adoption';
import { User } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.scss'],
})
export class MyPetsComponent implements OnInit {
  @Input() user: BehaviorSubject<User> = new BehaviorSubject({} as User);
  @Output() petEmitter = new EventEmitter<Animal>();
  petData = {} as Animal;
  showErrors: boolean = false;

  gender = [
    { name: 'Male', value: 'm' },
    { name: 'Female', value: 'f' },
  ];
  petType = [
    { name: 'Cat', value: 'Cat' },
    { name: 'Dog', value: 'Dog' },
  ];

  petForm: FormGroup = this._petBuilder.group({
    petName: ['', [Validators.required]],
    type: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    ownerName: ['', [Validators.required]],
    location: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(private _petBuilder: FormBuilder) {}

  get controlValidation() {
    return this.petForm.controls;
  }

  ngOnInit(): void {
    // wait for data then do action
    this.user.subscribe((res) => {
      if (res.pet) {
        //fill data from object to form
        this.petData = res.pet;
        this.petForm.controls['petName'].setValue(this.petData.name);
        this.petForm.controls['type'].setValue({
          name: this.petData.type,
          value: this.petData.type,
        });
        this.petForm.controls['gender'].setValue({
          name: this.petData.gender,
          value: this.petData.gender,
        });
        this.petForm.controls['birthdate'].setValue(this.petData.age);
        this.petForm.controls['ownerName'].setValue(this.petData.owner.name);
        this.petForm.controls['location'].setValue(this.petData.owner.location);
        this.petForm.controls['phoneNumber'].setValue(this.petData.owner.phone);
        this.petForm.controls['description'].setValue(this.petData.description);
      }
    });
  }
  submitPetForm() {
    if (this.petForm.status === 'INVALID') {
      this.showErrors = true;
    } else {
      console.log(this.petForm.value);
      this.petData.name = this.petForm.value['petName'];
      this.petData.type = this.petForm.value['type']['name'];
      this.petData.gender = this.petForm.value['gender']['name'];
      this.petData.age = `${this.petForm.value['birthdate']}`;
      this.petData.owner.name = this.petForm.value['ownerName'];
      this.petData.owner.location = this.petForm.value['location'];
      this.petData.owner.phone = this.petForm.value['phoneNumber'];
      this.petData.description = this.petForm.value['description'];
      this.petEmitter.emit(this.petData);
    }
  }
}
