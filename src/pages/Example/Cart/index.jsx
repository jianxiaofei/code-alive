import React from 'react';
import Cart from '@/container/Cart';
import StoreHouse from '@/container/StoreHouse';
import ShopSale from '@/container/ShopSale';
import './index.less'

export default function App() {
  return (
    <div className='app-container'>
      <StoreHouse />
      <ShopSale type="1" typeName="衣服" />
      <ShopSale type="2" typeName="鞋子" />
      <Cart />
    </div>
  );
}
