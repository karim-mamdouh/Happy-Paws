import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/interfaces/blog';
import { fillBlog, resetBlog } from './blog-actions';

const initialState = {
  blog: [] as Array<Article>,
};

export const blogReducer = createReducer(
  initialState,
  //Fill blog items action
  on(fillBlog, (state, action) => {
    return {
      ...state,
      blog: action.payload,
    };
  }),
  //Reset blog items action
  on(resetBlog, (state, action) => {
    return {
      ...state,
      blog: [] as Array<Article>,
    };
  })
);
