import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItem } from 'src/app/interfaces/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsObservable: Observable<{ products: Array<ProductItem> }>;
  constructor(private store: Store<{ store: { products: Array<ProductItem> } }>) {
    this.productsObservable = this.store.select('store');
  }

  ngOnInit(): void {
  }

}
