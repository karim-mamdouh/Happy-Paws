import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  item: number = 1;
  count: number = 0;
  constructor() {}

  ngOnInit(): void {}

  decreaseQty(): void {
    if (this.count >= 1) {
      this.count--;
    }
  }
  increaseQty(): void {
    this.count++;
  }
}
