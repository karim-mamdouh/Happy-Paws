import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/interfaces/blog';

//Fill blog action
export const fillBlog = createAction(
  'FILL_BLOG',
  props<{ payload: Array<Article> }>()
);
//Reset blog action
export const resetBlog = createAction('RESET_BLOG');
