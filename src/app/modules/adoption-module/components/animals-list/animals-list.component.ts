import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/adoption';
import { DatabaseService } from 'src/app/services/database.service';
import { fillAdoption } from 'src/app/store/adoption/adoption-actions';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
})
export class AnimalsListComponent implements OnInit {
  adoptionData: Observable<{ animals: Array<Animal> }> = new Observable(); // Observable to read adoption store items

  constructor(
    private _store: Store<{ adoption: { animals: Array<Animal> } }>,
    private _database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.adoptionData = this._store.select('adoption');
    this._database
      .fetchAllAnimals()
      .pipe(map((changes) => changes.map((c) => c.payload.doc.data())))
      .subscribe((res) => {
        this._store.dispatch(fillAdoption({ payload: res as Array<Animal> }));
      });
  }
}
