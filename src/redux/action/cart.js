import {
  ADDGOODS,
  DELGOODS,
  EDITGOODS,
  TAKECART,
  DELCARTITEM,
  CLEARCART,
  SETACCOUTS,
} from '../constant';

export const addGoods = (data) => ({ type: ADDGOODS, data });
export const delGoods = (data) => ({ type: DELGOODS, data });
export const editGoods = (data) => ({ type: EDITGOODS, data });
export const takeCart = (data) => ({ type: TAKECART, data });
export const delCartItem = (data) => ({ type: DELCARTITEM, data });
export const clearCart = (data) => ({ type: CLEARCART, data });
export const setAccouts = (data) => ({ type: SETACCOUTS, data });
