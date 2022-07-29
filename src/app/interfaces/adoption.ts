interface Owner {
  name: string;
  phone: number;
  location?: string;
}

export interface Animal {
  name: string;
  id: string;
  owner: Owner;
  age: string;
  gender: string;
  images?: Array<string>;
  description?: string;
  type: string;
}

export enum AnimalType {
  Cat = 'Cat',
  Dog = 'Dog',
  Bird = 'Bird',
  Fish = 'Fish',
}
