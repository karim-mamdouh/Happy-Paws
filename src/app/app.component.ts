import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { Store } from '@ngrx/store';
import { ProductItem } from 'src/app/interfaces/store';
import { fillProducts } from 'src/app/store/store/store-actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Happy Paws';  
  showNavbarFooter: boolean = false;
  constructor(
    private _router: Router,
    private primengConfig: PrimeNGConfig,
    private afs: DatabaseService,
    private store: Store<{ store: { store: Array<ProductItem> } }>
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._router.events.subscribe((event: any) => {
      if (event.url !== undefined && event.type === 1) {
        if (event.url.includes('login') || event.url.includes('register'))
          this.showNavbarFooter = false;
        else this.showNavbarFooter = true;
      }
    });

    this.afs.fetchAllStoreItems().pipe(
      map(changes =>
        changes.map(c => (c.payload.doc.data()))
      )
    ).subscribe((res) => {
      let temp = res as Array<ProductItem>;
      this.store.dispatch(fillProducts({ payload: temp }));
    })
  }
}
