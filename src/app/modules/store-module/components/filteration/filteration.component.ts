import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Brand, ProductCategory } from 'src/app/interfaces/store';
import { AnimalType } from 'src/app/interfaces/adoption';

@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss'],
})
export class FilterationComponent implements OnInit {
  @Input() filters: string[] = [];
  @Output() filterOptions = new EventEmitter<
    Array<AnimalType | Brand | ProductCategory>
  >();
  categories: string[] = Object.values(ProductCategory);
  brands: string[] = Object.values(Brand);
  animals: string[] = Object.values(AnimalType);

  constructor() {}

  ngOnInit(): void {}

  onFilterSelection(filter: string, event: any) {
    this.filterOptions.emit(
      this.filters as Array<AnimalType | Brand | ProductCategory>
    );
    // const selectedFilter = this.getFilter(filter);
    // const found = this.activeFilter.includes(selectedFilter);

    // if (!found) {
    //   this.activeFilter.push(this.getFilter(filter));
    // } else if (event.checked.includes(filter) && found) {
    //   //  console.log('o');
    //   this.activeFilter = this.activeFilter.filter(
    //     (element) => element !== selectedFilter
    //   );
    // }

    // this.activeFilter = this.filters as Array<
    //   AnimalType | Brand | ProductCategory
    // >;
    // console.log(this.activeFilter);
  }

  // getFilter(filter: string): ProductCategory | AnimalType | Brand {
  //   let foundFilter: ProductCategory | AnimalType | Brand;
  //   if (this.categories.includes(filter)) {
  //     const indexOfS = Object.values(ProductCategory).indexOf(
  //       filter as unknown as ProductCategory
  //     );
  //     foundFilter = Object.keys(ProductCategory)[indexOfS] as ProductCategory;
  //   } else if (this.brands.includes(filter)) {
  //     const indexOfS = Object.values(Brand).indexOf(filter as unknown as Brand);
  //     foundFilter = Object.keys(Brand)[indexOfS] as Brand;
  //   } else {
  //     const indexOfS = Object.values(AnimalType).indexOf(
  //       filter as unknown as AnimalType
  //     );
  //     foundFilter = Object.keys(AnimalType)[indexOfS] as AnimalType;
  //   }
  //   return foundFilter;
  // }
}

export interface FilterData {
  animalType: Array<AnimalType>;
  category: Array<ProductCategory>;
  brand: Array<Brand>;
}
