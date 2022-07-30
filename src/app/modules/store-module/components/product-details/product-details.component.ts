import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
