import React from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import { List, Button, Space } from 'antd';
import { delCartItem, clearCart, setAccouts } from '@/redux/action/cart';

const Cart = props => {
  const { cartList = [], delCartItem, setAccouts, clearCart } = props;
  // 删除
  const goodsDel = id => {
    delCartItem(cartList.filter(v => v.id !== id));
  };

  // 结算
  const accoutsSet = () => {
    PubSub.publish('set-accouts', cartList);
    setAccouts();
  };

  return (
    <div className="cart-wrap">
      <h4>购物车</h4>
      <List
        bordered
        dataSource={cartList}
        renderItem={item => (
          <List.Item>
            <span>
              {item.name} <i style={{ color: 'red', marginLeft: '20px' }}>￥</i>
              {item.price}
            </span>
            <Button danger onClick={() => goodsDel(item.id)}>
              删除
            </Button>
          </List.Item>
        )}
      />
      <Space style={{ marginTop: '10px' }}>
        <Button danger onClick={clearCart}>
          清空购物车
        </Button>
        <Button type="primary" onClick={accoutsSet}>
          结算
        </Button>
      </Space>
    </div>
  );
};
const mapStateToProps = state => ({ cartList: state.cart.cart });

const mapDispatchToProps = { delCartItem, clearCart, setAccouts };

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
