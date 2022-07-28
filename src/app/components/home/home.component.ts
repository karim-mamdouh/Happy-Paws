import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { Store } from '@ngrx/store';
import { ProductItem } from 'src/app/interfaces/store';
import { fillProducts } from 'src/app/store/store/store-actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private afs: DatabaseService, private store: Store<{ store: { store: Array<ProductItem> } }>) {
    this.afs.fetchAllStoreItems().pipe(
      map(changes =>
        changes.map(c => (c.payload.doc.data()))
      )
    ).subscribe((res) => {
      let temp = res as Array<ProductItem>;
      this.store.dispatch(fillProducts({ payload: temp }));
    })
  }

  ngOnInit(): void {
  }

}
