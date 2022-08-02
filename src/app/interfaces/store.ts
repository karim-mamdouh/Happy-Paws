import { AnimalType } from './adoption';

export interface Review {
  userID: string;
  userName:string;
  rate: number;
  comment?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  wishList: boolean;
  reviews: Array<Review>;
  rate: number;
  category: ProductCategory;
  animalType: AnimalType;
  brand: Brand;
  images: Array<string>;
  quantity?: number;
}

export interface CartItem extends ProductItem {
  count: number;
}

export enum ProductCategory {
  Supplies = 'Supplies',
  Accessories = 'Accessories',
  Toys = 'Toys',
  Litter = 'Litter',
  Grooming = 'Grooming',
}


export enum Brand {
  Josera = 'Josera',
  RoyalCanin = 'Royal Canin',
  Belcando = 'Belcando',
  Mera = 'Mera',
  OmniGuard = 'Omni Guard',
  Bewi = 'Bewi',
  PetMatter = 'Pet Matters',
  Nunbell = 'Nunbell',
  Alpha = 'Alpha',
  Perfecto = 'Perfecto',
  Quiko = 'Quiko',
  Georplast = 'Georplast',
  GiGwi = 'GiGwi',
  Ariika = 'Ariika',
  PetsRepublic = "Pets Republic",
  WonderCat = "Wonder Cat",
  RoseFishFood = "Rose Fish Food"
}
