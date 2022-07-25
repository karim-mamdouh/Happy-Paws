import { AnimalType } from './adoption';

export interface Review {
  userID: string;
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
