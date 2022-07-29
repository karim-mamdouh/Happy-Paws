import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItem } from 'src/app/interfaces/store';
import { filterData } from '../filteration/filteration.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  productsObservable: Observable<{ products: Array<ProductItem> }>;
  filterOptions ={};
  onFilterOptionChange(filterOptions:filterData){
    console.log("Parent",filterOptions);
    this.filterOptions
  }
  constructor(
    private router: ActivatedRoute,
    private store: Store<{ store: { products: Array<ProductItem> } }>) {
    this.productsObservable = this.store.select('store');
  }

  ngOnInit(): void {}

}