import { UPDATE_SERVICES, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, TOGGLE_CART } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SERVICES:
      return {
        ...state,
        services: [...action.services],
      }

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.service],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((service) => {
        return service._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    default:
      return state;
  }
}