import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  val2: number = 0;
  quantity: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
