import { createAction, props } from '@ngrx/store';
import { CartItem, ProductItem, Review } from 'src/app/interfaces/store';

//Fill products action
export const fillProducts = createAction(
  'FILL_PRODUCTS',
  props<{ payload: Array<ProductItem> }>()
);
//Add Review to product item action
export const addReview = createAction(
  'ADD_REVIEW',
  props<{ payload: { id: string; review: Review } }>()
);
//Empty product list action
export const resetProducts = createAction('RESET_PRODUCTS');
//Add product item to wishlist action
export const addToWishList = createAction(
  'ADD_TO_WISHLIST',
  props<{ payload: ProductItem }>()
);
//Remove product item from wishlist action
export const removeFromWishList = createAction(
  'REMOVE_FROM_WISHLIST',
  props<{ payload: { id: string } }>()
);
//Fill wishlist items action
export const fillWishList = createAction(
  'FILL_WISHLIST',
  props<{ payload: Array<ProductItem> }>()
);
//Reset wishlist items action
export const resetWishList = createAction('RESET_WISH_LIST');
//Add product item to cart action
export const addToCart = createAction(
  'ADD_TO_CART',
  props<{ payload: CartItem }>()
);
//Remove product item from cart action
export const removeFromCart = createAction(
  'REMOVE_FROM_CART',
  props<{ payload: { id: string } }>()
);
//Increase cart quantity action
export const incrementCartItem = createAction(
  'INCREMENT_CART_ITEM',
  props<{ payload: { id: string } }>()
);
//Decrement cart quantity action
export const decrementCartItem = createAction(
  'DECREMENT_CART_ITEM',
  props<{ payload: { id: string } }>()
);
//Reset cart action
export const resetCart = createAction('RESET_CART');
