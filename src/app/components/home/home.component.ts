import { Component, OnInit } from '@angular/core';
import { Animal, AnimalType } from 'src/app/interfaces/adoption';
import { Brand, ProductCategory, ProductItem } from 'src/app/interfaces/store';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/blog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quantity: number = 1;
  articles: Array<Article> = [];
  animals: Array<Animal> = [];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  products: Array<ProductItem> = [
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
    {
      animalType: AnimalType.Cat,
      brand: Brand.Alpha,
      category: ProductCategory.Accessories,
      price: 50,
      title: 'ABC',
      images: [''],
      id: '',
      rate: 5,
      description: '',
      wishList: false,
      reviews: [],
    },
  ];
  constructor(
    private _router: Router,
    private _productStore: Store<{ store: { products: Array<ProductItem> } }>,
    private _blogStore: Store<{ blog: { blog: Array<Article> } }>,
    private _animalStore: Store<{ adoption: { animals: Array<Animal> } }>
  ) {}

  ngOnInit(): void {}
  onShopNowClick() {
    this._router.navigate([`/store/products`]);
  }

  onTypeClick(animal: string) {
    switch (animal) {
      case 'cats':
        this._router.navigate(['/store/products'], {
          queryParams: { animalType: AnimalType.Cat },
        });
        break;
      case 'dogs':
        this._router.navigate(['/store/products'], {
          queryParams: { animalType: AnimalType.Dog },
        });
        break;
    }
  }

  // uniqueCardGenerator<T>(numberOfRecipes: number) {
  //   let uniqueRecipes: Array<T> = [];
  //   for (let i = 0; i < numberOfRecipes; ) {
  //     let recipeIndex: number = Math.floor(Math.random() * recipes.length);
  //     if (
  //       uniqueRecipes.filter(
  //         (element) => element.id === recipes[recipeIndex].recipe_id
  //       ).length === 0
  //     ) {
  //       uniqueRecipes.push(recipes[recipeIndex]);
  //       i++;
  //     }
  //   }
  // }
  onWhatWeCanDoCardsClick(feature: string) {
    switch (feature) {
      case 'store':
        this._router.navigate(['/store/products']);
        break;
      case 'adoption':
        this._router.navigate(['/adoption']);
        break;
      case 'blog':
        this._router.navigate(['/blog']);
        break;
    }
  }
}
