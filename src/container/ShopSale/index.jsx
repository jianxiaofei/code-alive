import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import { delGoods, addGoods, takeCart, delCartItem } from '@/redux/action/cart';
import { Input, Button, List, Space } from 'antd';

function ShopSale(props) {
  const countRef = useRef();
  const [saleList, setSaleList] = useState([]);
  const { goodsList, cartList, typeName, type } = props;

  // 上架商品
  const getsaleList = () => {
    const { state } = countRef.current;
    const allSale = goodsList.filter(v => v.type === type && !saleList.find(j => j.id === v.id));
    if (allSale.length) {
      const currSaleList = allSale.slice(0, state.value);
      props.delGoods(goodsList.filter(v => !currSaleList.find(j => j.id === v.id)));
      setSaleList([...currSaleList, ...saleList]);
    }
  };

  // 下架商品
  const cancelSale = goods => {
    const { id } = goods;
    const newsaleList = saleList.filter(v => v.type === type && v.id !== id);
    setSaleList(newsaleList);
    props.delCartItem(cartList.filter(v => v.id !== id));
    props.addGoods(goods);
  };

  // 购买商品
  const beSale = goods => {
    const { id } = goods;
    const newsaleList = saleList.filter(v => v.type === type && v.id !== id);
    setSaleList(newsaleList);
    props.delCartItem(cartList.filter(v => v.id !== id));
  };

  // 添加购物车
  const setCart = goods => {
    if (!cartList.find(v => v.id === goods.id)) {
      props.takeCart(goods);
    }
  };

  useEffect(() => {
    PubSub.subscribe('set-accouts', (_, data) => {
      const newsaleList = saleList.filter(v => v.type === type && !data.find(j => j.id === v.id));
      setSaleList([...newsaleList]);
    });
    return () => PubSub.unsubscribe('set-accouts');
  });

  return (
    <div className="shop-wrap">
      <h4>{typeName}商店</h4>
      <Input type="number" style={{ width: '100px', marginRight: '5px' }} ref={countRef} defaultValue="1" />
      <Button onClick={getsaleList}>上架{typeName}售卖</Button>
      <List
        bordered
        style={{ margin: '10px 0' }}
        dataSource={saleList}
        renderItem={goods => (
          <List.Item>
            <span>
              {goods.name} <i style={{ color: 'red', marginLeft: '20px' }}>￥</i>
              {goods.price}
            </span>
            <Space>
              <Button onClick={() => cancelSale(goods)}>下架</Button>
              <Button onClick={() => beSale(goods)}>购买</Button>
              <Button onClick={() => setCart(goods)}>加购物车</Button>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
}

const mapStateToProps = state => ({ goodsList: state.cart.storeHouse, cartList: state.cart.cart });

const mapDispatchToProps = { delGoods, addGoods, takeCart, delCartItem };

export default connect(mapStateToProps, mapDispatchToProps)(ShopSale);
