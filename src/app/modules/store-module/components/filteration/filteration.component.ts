import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand, ProductCategory } from 'src/app/interfaces/store';
import { AnimalType } from 'src/app/interfaces/adoption';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss'],
})

export class FilterationComponent implements OnInit {
  categories: string[] = Object.values(ProductCategory);
  brands: string[] = Object.values(Brand);
  animals: string[] = Object.values(AnimalType);

  selectedAnimalType: string[] = [];
  selectedCategory: string[] = [];
  selectedBrand: string[] = [];
  @Output() filterOptions = new EventEmitter<FilterData>();
  constructor(private router: ActivatedRoute) { }


  onCheckboxValueChange() {
    this.filterOptions.emit(this.getFilterValues());
  }

  getFilterValues(): FilterData {
    return {"animalType": this.selectedAnimalType,"category": this.selectedCategory,"brand": this.selectedBrand};
  }

  ngOnInit(): void {
    this.router.parent?.queryParams.subscribe(res => {
      res['animalType'] === undefined
        ?
        this.selectedAnimalType = []
        :
        this.selectedAnimalType = [`${res['animalType']}`];

      res['category'] === undefined
        ?
        this.selectedCategory = []
        :
        this.selectedCategory = [`${res['category']}`];

      this.filterOptions.emit(this.getFilterValues());
    });
  }
}

export interface FilterData {
  "animalType": string[],
  "category": string[],
  "brand": string[]
}