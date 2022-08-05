import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import { FilterData } from '../filteration/filteration.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  // Filteration
  originalDataList: Array<ProductItem> = [];
  filteredProductList: Array<ProductItem> = [];

 // Paginator Large screen
 numberOfItemsInPage: number = 9;
 pageStartIndex: number = 0;
 pageEndIndex: number = this.pageStartIndex + this.numberOfItemsInPage;
 displayPaginatorProductsChunk: Array<ProductItem> = [];

 // Paginator Small screen
 numberOfItemsInPage_small: number = 3;
 pageEndIndex_small: number = this.pageStartIndex + this.numberOfItemsInPage_small;
 displayPaginatorProductsChunk_small: Array<ProductItem> = [];

 // Detect if its a mobile screen size
 isMobile = false;
 getIsMobile(): boolean {
   const width = document.documentElement.clientWidth;
   const breakpoint = 992;
   if (width < breakpoint) {
     return true;
   } else {
     return false;
   }
 }
  constructor(private _store: Store<{ store: { cart: Array<CartItem>, products: Array<ProductItem>, wishList: Array<ProductItem> } }>) {
    this._store.select('store').subscribe(res => {
      this.originalDataList = res.products;
      this.filteredProductList = this.originalDataList;
      if(this.isMobile){
        this.paginateSmall(0,this.pageEndIndex_small);
      }else{
        this.paginate(0,this.pageEndIndex);
      }
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
      this.filteredProductList = this.originalDataList;
      this.paginate(this.pageStartIndex, this.pageEndIndex);
      this.paginateSmall(this.pageStartIndex, this.pageEndIndex_small);
    }
    // Step 1: Check for Animal options
    if (filterOptions.animalType.length > 0) {
      // first: filter based on selected animal from original data
      this.filterAnimal(this.originalDataList, filterOptions);
      // if category selected
      if (filterOptions.category.length > 0) {
        // filter category based on the previous filtered list of ( animals only / animals + brand )
        let prevList = this.filteredProductList;
        this.filterCategory(prevList, filterOptions);
      }
      // Check if brand selected
      if (filterOptions.brand.length > 0) {
        // filter brand based on the previous filtered list of ( animals only / animals + category )
        let prevList = this.filteredProductList;
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
          let prevList = this.filteredProductList;
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

  paginate(start: number, end: number) {
    this.displayPaginatorProductsChunk = this.filteredProductList.slice(start, end);
  }
  paginateSmall(start: number, end: number) {
    this.displayPaginatorProductsChunk_small = this.filteredProductList.slice(start, end);
  }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  filterAnimal(data: Array<ProductItem>, filterOptions: FilterData) {
    this.filteredProductList = data.filter((product: ProductItem) => {
      return filterOptions.animalType.includes(product.animalType);
    });
    this.paginate(this.pageStartIndex, this.pageEndIndex);
    this.paginateSmall(this.pageStartIndex, this.pageEndIndex_small);
  }
  filterCategory(data: Array<ProductItem>, filterOptions: FilterData) {
    this.filteredProductList = data.filter((product: ProductItem) => {
      return filterOptions.category.includes(product.category);
    });
    this.paginate(this.pageStartIndex, this.pageEndIndex);
    this.paginateSmall(this.pageStartIndex, this.pageEndIndex_small);
  }
  filterBrand(data: Array<ProductItem>, filterOptions: FilterData) {
    this.filteredProductList = data.filter((product: ProductItem) => {
      return filterOptions.brand.includes(product.brand);
    });
    this.paginate(this.pageStartIndex, this.pageEndIndex);
    this.paginateSmall(this.pageStartIndex, this.pageEndIndex_small);
  }
}