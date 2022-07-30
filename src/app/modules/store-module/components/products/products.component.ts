import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductItem } from 'src/app/interfaces/store';
import { FilterData } from '../filteration/filteration.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  originalDataList: Array<ProductItem> = [];
  displayFilteredProductList: Array<ProductItem> = [];

  constructor(
    private store: Store<{ store: { products: Array<ProductItem> } }>) {
    this.store.select('store').subscribe(res => {
      this.originalDataList = res.products;
      this.displayFilteredProductList = this.originalDataList;
    });
  }

  onFilterOptionsChange(filterOptions: FilterData) {

    this.filterData(filterOptions);
  }


  filterData(filterOptions: FilterData) {
    // Reset if no selected options
    if (filterOptions.animalType.length === 0
      && filterOptions.category.length === 0
      && filterOptions.brand.length === 0) {
      this.displayFilteredProductList = this.originalDataList;
    }
    // Step 1: Check for Animal options
    if (filterOptions.animalType.length > 0) {
      // first: filter based on selected animal from original data
      this.filterAnimal(this.originalDataList, filterOptions);
      // if category selected
      if (filterOptions.category.length > 0) {
        // filter category based on the previous filtered list of ( animals only / animals + brand )
        let prevList = this.displayFilteredProductList;
        this.filterCategory(prevList, filterOptions);
      }
      // Check if brand selected
      if (filterOptions.brand.length > 0) {
        // filter brand based on the previous filtered list of ( animals only / animals + category )
        let prevList = this.displayFilteredProductList;
        this.filterBrand(prevList, filterOptions);
      }
    } else {
      // If no Animal selected then we enter this scope
      // Then check for Category options
      if (filterOptions.category.length > 0) {
        // if category selected then we enter this scope
        // first: filter based on selected category from original data
        this.filterCategory(this.originalDataList, filterOptions);
        // if brand selected
        if (filterOptions.brand.length > 0) {
          // filter brand based on the previous filtered list of ( category only )
          let prevList = this.displayFilteredProductList;
          this.filterBrand(prevList, filterOptions);
        }
      } else {
        // If no Category selected then we enter this scope
        // Then check for Brand options
        if (filterOptions.brand.length > 0) {
          // first: filter based on selected brand from original data
          this.filterBrand(this.originalDataList, filterOptions);
          // other cases are handled by the previous scopes
        }
      }
    }

  }



  ngOnInit(): void { }

  filterAnimal(data: Array<ProductItem>, filterOptions: FilterData) {
    this.displayFilteredProductList = data.filter((product: ProductItem) => {
      return filterOptions.animalType.includes(product.animalType);
    });
  }
  filterCategory(data: Array<ProductItem>, filterOptions: FilterData) {
    this.displayFilteredProductList = data.filter((product: ProductItem) => {
      return filterOptions.category.includes(product.category);
    });
  }
  filterBrand(data: Array<ProductItem>, filterOptions: FilterData) {
    this.displayFilteredProductList = data.filter((product: ProductItem) => {
      return filterOptions.brand.includes(product.brand);
    });
  }
}