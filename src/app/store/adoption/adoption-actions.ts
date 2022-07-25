import { createAction, props } from '@ngrx/store';
import { Animal } from 'src/app/interfaces/adoption';

//Fill animals action
export const fillAdoption = createAction(
  'FILL_ADOPTION',
  props<{ payload: Array<Animal> }>()
);
//Reset animals action
export const resetAdoption = createAction('RESET_ADOPTION');
