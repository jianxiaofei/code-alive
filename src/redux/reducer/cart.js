import { combineReducers } from 'redux';
import {
  ADDGOODS,
  DELGOODS,
  EDITGOODS,
  TAKECART,
  CLEARCART,
  DELCARTITEM,
  SETACCOUTS,
} from '../constant';

// 仓库商品
function storeHouse(state = [], action) {
  switch (action.type) {
    case ADDGOODS: 
      return [action.data, ...state];
    case DELGOODS:
      return [...action.data];
    case EDITGOODS: 
      return [...action.data];
    default:
      return state;
  }
}

// 购物车
function cart(state = [], action) {
  switch (action.type) {
    case TAKECART: 
      return [action.data, ...state];
    case DELCARTITEM: 
      return [...action.data];
    case CLEARCART: 
      return [];
    case SETACCOUTS:
      return [];
    default:
      return state;
  }
}

export default combineReducers({ storeHouse, cart });
