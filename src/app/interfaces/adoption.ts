interface Owner {
  name: string;
  phone: number;
  location?: string;
}

export interface Animal {
  name: string;
  id: string;
  owner: Owner;
  age: number;
  vaccines?: Array<string>;
  images: Array<string>;
  description?: string;
  color?: string;
  type: AnimalType;
}

export enum AnimalType {
  Cat = 'Cat',
  Dog = 'Dog',
  Bird = 'Bird',
  Fish = 'Fish',
}
