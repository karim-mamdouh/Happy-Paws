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
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  id?: string;
  pet?: Animal;
  phoneNumber?: string;
  address?: Address;
  previousOrders?: Array<ProductItem>;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
