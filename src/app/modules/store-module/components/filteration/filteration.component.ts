import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Brand, FilterData, ProductCategory } from 'src/app/interfaces/store';
import { AnimalType } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss'],
})
export class FilterationComponent implements OnInit {
  @Input() activeFilters: FilterData = {
    brand: [],
    category: [],
    animalType: [],
  };
  @Output() filterOptions = new EventEmitter<FilterData>();
  categories: string[] = Object.values(ProductCategory);
  brands: string[] = Object.values(Brand);
  animals: string[] = Object.values(AnimalType);

  constructor() {}

  ngOnInit(): void {}

  onFilterSelection() {
    this.filterOptions.emit(this.activeFilters);
  }
}
