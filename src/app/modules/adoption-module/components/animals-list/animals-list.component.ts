import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
})
export class AnimalsListComponent implements OnInit {
  adoptionData: Observable<{ animals: Array<Animal> }> = new Observable(); // Observable to read adoption store items

  constructor(
    private _store: Store<{ adoption: { animals: Array<Animal> } }>
  ) {}

  ngOnInit(): void {
    this.adoptionData = this._store.select('adoption');
  }
}
