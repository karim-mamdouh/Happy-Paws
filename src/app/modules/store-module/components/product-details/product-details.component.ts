import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from 'src/app/interfaces/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  val: number = 0;
  val1: number = 4;
  quantity: number = 1;
  checked1: boolean = false;
  checked2: boolean = true;

  product: ProductItem = {} as ProductItem;

  constructor(private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this._router.queryParams.subscribe((res) => {
      this.product = JSON.parse(res['product']);
    });
  }
}
