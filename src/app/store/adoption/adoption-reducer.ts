import { createReducer, on } from '@ngrx/store';
import { Animal } from 'src/app/interfaces/adoption';
import { fillAdoption, resetAdoption } from './adoption-actions';

const initialState = {
  animals: [] as Array<Animal>,
};

export const adoptionReducer = createReducer(
  initialState,
  //Fill animals action
  on(fillAdoption, (state, action) => {
    return {
      ...state,
      animals: action.payload,
    };
  }),
  //Reset animals action
  on(resetAdoption, (state, action) => {
    return {
      ...state,
      animals: [] as Array<Animal>,
    };
  })
);
