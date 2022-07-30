import { Animal } from './adoption';
import { ProductItem } from './store';

export interface Address {
  street: string;
  city: string;
  area: string;
  buildingNumber: string;
  floorNumber: number;
  apartmentNumber: string;
}

export interface User {
  id?: string;
  email: string;
  pet?: Animal;
  userName: string;
  phoneNumber?: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  address?: Address;
  previousOrders?: Array<ProductItem>;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
