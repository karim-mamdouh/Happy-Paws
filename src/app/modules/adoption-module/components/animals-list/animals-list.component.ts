import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/adoption';
import { fillAdoption } from 'src/app/store/adoption/adoption-actions';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
})
export class AnimalsListComponent implements OnInit {
  adoptionData: Observable<{ animals: Array<Animal> }> = new Observable(); // Observable to read adoption store items

  constructor(private _store: Store<{ adoption: { animals: Array<Animal> } }>) {
    this._store.dispatch(fillAdoption({ payload: this.animals }));
  }

  ngOnInit(): void {
    this.adoptionData = this._store.select('adoption');
  }

  animals = [
    {
      name: 'Meow',
      owner: { name: 'Yasmeen', location: 'aaa', phone: '1111111111' },
      age: 9,
      gender: 'Female',
      type: 'cat',
      weight: 10,
      image: 'assets/images/animals/cat4.jpg',
    },
    {
      name: 'Meow',
      owner: { name: 'Yasmeen', location: 'aaa', phone: '1111111111' },
      age: 9,
      gender: 'Female',
      type: 'cat',
      weight: 10,
      image: 'assets/images/animals/cat4.jpg',
    },
    {
      name: 'Meow',
      owner: { name: 'Yasmeen', location: 'aaa', phone: '1111111111' },
      age: 9,
      gender: 'Female',
      type: 'cat',
      weight: 10,
      image: 'assets/images/animals/cat4.jpg',
    },
    {
      name: 'Meow',
      owner: { name: 'Yasmeen', location: 'aaa', phone: '1111111111' },
      age: 9,
      gender: 'Female',
      type: 'cat',
      weight: 10,
      image: 'assets/images/animals/cat4.jpg',
    },
  ];
}
