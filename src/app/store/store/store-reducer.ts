import { createReducer, on } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import {
  addToCart,
  addToWishList,
  alterReview,
  fillCartList,
  fillProducts,
  fillWishList,
  removeFromCart,
  removeFromWishList,
  resetCart,
  resetProducts,
  resetWishList,
  updateCartItem,
} from './store-actions';

const initalState = {
  products: [] as Array<ProductItem>,
  wishList: [] as Array<ProductItem>,
  cart: [] as Array<CartItem>,
};

export const storeReducer = createReducer(
  initalState,
  //Fill products action
  on(fillProducts, (state, action) => {
    return {
      ...state,
      products: [...state.products, ...action.payload],
    };
  }),
  //Reset products action
  on(resetProducts, (state, action) => {
    return {
      ...state,
      products: [] as Array<ProductItem>,
    };
  }),
  //Add new review to product item in store action
  on(alterReview, (state, action) => {
    let productsCopy: Array<ProductItem> = [...state.products];
    let index = productsCopy.findIndex(
      (element) => element.id === action.payload.id
    );

    if (index !== -1) {
      productsCopy[index] = {
        ...action.payload,
      };
    } else throw new Error('Item not found, check item id');

    return {
      ...state,
      products: productsCopy,
    };
  }),
  //Add product item to wishlist action
  on(addToWishList, (state, action) => {
    let productsCopy: Array<ProductItem> = [...state.products];
    let index = productsCopy.findIndex(
      (element) => element.id === action.payload.id
    );

    if (index !== -1) productsCopy[index] = { ...action.payload };
    else throw new Error('Item not found, check item id');

    return {
      ...state,
      wishList: [...state.wishList, action.payload],
      products: productsCopy,
    };
  }),
  //Remove product item from wishlist action
  on(removeFromWishList, (state, action) => {
    let productsCopy: Array<ProductItem> = [...state.products];
    let index = productsCopy.findIndex(
      (element) => element.id === action.payload.id
    );

    if (index !== -1) productsCopy[index] = { ...action.payload };
    else throw new Error('Item not found, check item id');

    return {
      ...state,
      wishList: [
        ...state.wishList.filter((element) => element.id !== action.payload.id),
      ],
      products: productsCopy,
    };
  }),
  //Fill wishlist items action
  on(fillWishList, (state, action) => {
    return {
      ...state,
      wishList: [...state.wishList, ...action.payload],
    };
  }),
  //Reset wishlist items action
  on(resetWishList, (state, action) => {
    return {
      ...state,
      wishList: [] as Array<ProductItem>,
    };
  }),
  //Fill cart list items action
  on(fillCartList, (state, action) => {
    return {
      ...state,
      cart: [...state.cart, ...action.payload],
    };
  }),
  //Add product item to cart action
  on(addToCart, (state, action) => {
    let cartItem = state.cart.find(
      (element) => element.id === action.payload.id
    );
    if (cartItem === undefined) {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    } else {
      return { ...state };
    }
  }),
  //Remove from cart action
  on(removeFromCart, (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((element) => element.id !== action.payload.id),
    };
  }),
  //Increment cart item quantity action
  on(updateCartItem, (state, action) => {
    let cartCopy: Array<CartItem> = [...state.cart];
    let index = cartCopy.findIndex(
      (element) => element.id === action.payload.id
    );

    if (index !== -1) cartCopy[index] = { ...action.payload };
    else throw new Error('Item not found, check item id');

    return {
      ...state,
      cart: cartCopy,
    };
  }),
  //Reset cart action
  on(resetCart, (state, action) => {
    return {
      ...state,
      cart: [] as Array<CartItem>,
    };
  })
);
