import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
})
export class AnimalDetailsComponent implements OnInit {
  @Input() animal = {} as Animal;

  constructor() {
    this.animal = {
      name: 'Meow',
      owner: { name: 'Yasmeen', location: 'aaa', phone: 158 },
      age: 9,
      gender: 'Female',
      description: '',
      type: 'cat',
      weight: 10,
    };
  }

  ngOnInit(): void {}
}
