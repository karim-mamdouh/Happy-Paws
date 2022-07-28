import { Component, OnInit } from '@angular/core';
import { Brand, ProductCategory } from 'src/app/interfaces/store';
import { AnimalType } from 'src/app/interfaces/adoption';
@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss'],
})
export class FilterationComponent implements OnInit {
  categories: string[] = Object.keys(ProductCategory);
  brands: string[] = Object.keys(Brand);
  animals: string[] = Object.keys(AnimalType);

  checked: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
