import { AnimalType } from './adoption';

export interface Review {
  userID: string;
  comment: string;
  rate: number;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity?: number;
  wishList: boolean;
  reviews: Array<Review>;
  rate: number;
  category: ProductCategory;
  animalType: AnimalType;
  brand: Brand;
  images: Array<string>;
}

export enum ProductCategory {
  Supplies = 'Supplies',
  Accessories = 'Accessories',
  Toys = 'Toys',
  Litter = 'Litter',
  Grooming = 'Gromming',
}

export enum Brand {
  Josera = 'Josera',
  RoyalCanin = 'Royal Canin',
  Belcando = 'Belcando',
  Mera = 'Mera',
  OmniGuard = 'Omni Guard',
  Leonardo = 'Leonardo',
  Friskies = 'Friskies',
  Bewi = 'Bewi',
  Uarone = 'Uarone',
  DOCO = 'DOCO',
  PetsRepublic = 'Pets Republic',
  Piper = 'Piper',
  CatZone = 'Cat Zone',
  SaniCat = 'SaniCat',
}
