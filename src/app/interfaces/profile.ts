import { ProductItem } from './store';

export interface Address {
  street: string;
  apartment: string;
  city: string;
  building: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  phone: number;
  userName: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthdate: string;
  address?: Address;
  previousOrders?: Array<ProductItem>;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
