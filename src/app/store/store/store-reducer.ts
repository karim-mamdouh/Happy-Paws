import { createReducer, on } from '@ngrx/store';
import { CartItem, ProductItem } from 'src/app/interfaces/store';
import {
  addReview,
  addToCart,
  addToWishList,
  decrementCartItem,
  fillCartList,
  fillProducts,
  fillWishList,
  incrementCartItem,
  removeFromCart,
  removeFromWishList,
  resetCart,
  resetProducts,
  resetWishList,
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
  on(addReview, (state, action) => {
    let productsCopy = [...state.products];
    let index = productsCopy.findIndex(
      (element) => element.id === action.payload.id
    );

    if (index !== -1)
      productsCopy[index] = {
        ...productsCopy[index],
        reviews: [...productsCopy[index].reviews, action.payload.review],
      };
    else throw new Error('Item not found, check item id');

    return {
      ...state,
      products: productsCopy,
    };
  }),
  //Add product item to wishlist action
  on(addToWishList, (state, action) => {
    let productsCopy = [...state.products];
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
    let productsCopy = [...state.products];
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
  on(incrementCartItem, (state, action) => {
    let cartItem = state.cart.find(
      (element) => element.id === action.payload.id
    );
    if (cartItem === undefined) {
      throw new Error('Item not found, check item id');
    }
    return {
      ...state,
      cart: [
        ...state.cart.filter((element) => element.id !== action.payload.id),
        {
          ...cartItem!,
          count: cartItem.count + 1,
        },
      ],
    };
  }),
  //Decrement cart item quantity action
  on(decrementCartItem, (state, action) => {
    let cartItem = state.cart.find(
      (element) => element.id === action.payload.id
    );
    if (cartItem === undefined) {
      throw new Error('Item not found, check item id');
    }
    if (cartItem.count > 0) {
      cartItem.count = cartItem?.count - 1;
      return {
        ...state,
        cart: [
          ...state.cart.filter((element) => element.id !== action.payload.id),
          {
            ...cartItem!,
            count: cartItem.count - 1,
          },
        ],
      };
    } else {
      return {
        ...state,
      };
    }
  }),
  //Reset cart action
  on(resetCart, (state, action) => {
    return {
      ...state,
      cart: [] as Array<CartItem>,
    };
  })
);
