import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Brand, FilterData, ProductCategory } from 'src/app/interfaces/store';
import { AnimalType } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-small-filter',
  templateUrl: './small-filter.component.html',
  styleUrls: ['./small-filter.component.scss'],
})
export class SmallFilterComponent implements OnInit {
  @Input() activeFilters: FilterData = {
    brand: [],
    category: [],
    animalType: [],
  }; //Filters object holding all filter categories
  @Output() filterOptions = new EventEmitter<FilterData>(); //Emitter for filter changing action
  categories: string[] = Object.values(ProductCategory); //ProductCategory enum values
  brands: string[] = Object.values(Brand); //Brand enum values
  animals: string[] = Object.values(AnimalType); //AnimalType enum values

  constructor() {}

  ngOnInit(): void {}
  //Function called when any filter is selected/unseclected to emit event to parent with new filters
  onFilterSelection() {
    this.filterOptions.emit(this.activeFilters);
  }
}
