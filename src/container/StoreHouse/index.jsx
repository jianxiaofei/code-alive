import React, { useState } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { Form, Input, Button, Radio, Select, List } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { addGoods, delGoods, editGoods } from '@/redux/action/cart'

function StoreHouse(props) {
  const [edit, setAction] = useState({});
  const [form] = useForm();

  // 新增
  function goodsAdd(values) {
    const { name, price, type } = values;
    props.addGoods({ id: nanoid(), name, price, type })
    initGoodsInput()
  }

  // 删除
  const goodsDel = (id) => {
    props.delGoods(props.goodsList.filter(v => v.id !== id));
  }

  // 修改
  const goodsEdit = (values) => {
    const { id } = edit;
    const { name, price, type } = values;
    const newGoodsList = props.goodsList.map(goods => {
      return goods.id === id ? { name, price, type, id } : goods;
    });
    props.editGoods(newGoodsList);
    initGoodsInput()
  }

  // 设置修改数据
  const setEditData = (data) => {
    form.setFieldsValue({ name: data.name, price: data.price, type: data.type })
    setAction({ isEditing: true, id: data.id });
  }

  // 初始化
  const initGoodsInput = () => {
    form.resetFields();
    setAction({})
  }

  return (
    <>
      <h4>仓库</h4>
      <div className='store-wrap'>
        <Form
          name="basic"
          form={form}
          style={{ width: '40%' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          onFinish={edit.isEditing ? goodsEdit : goodsAdd}
        >
          <Form.Item label="商品名称" name="name" rules={[{ required: true, message: '必填项!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="商品价格" name="price" rules={[{ required: true, message: '必填项!' }]} >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="type" label="商品类型" initialValue="1">
            <Select placeholder="请选择商品类型">
              <Select.Option value="1">衣服</Select.Option>
              <Select.Option value="2">鞋子</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">{edit.isEditing ? '修改' : '生成商品'} </Button>
            <Button danger style={{ marginLeft: "10px" }} onClick={initGoodsInput} htmlType="reset">重置</Button>
          </Form.Item>
        </Form>
        <List
          bordered
          header={<b>库存</b>}
          style={{ width: "56%" }}
          dataSource={props.goodsList}
          renderItem={goods => (
            <List.Item>
              <Radio checked={goods.id === edit.id} value={goods.id} onChange={() => setEditData(goods)} >
                <span>{goods.name} <i style={{ color: "red", marginLeft: "20px" }}>￥</i>{goods.price}</span>
              </Radio>
              <Button danger onClick={() => goodsDel(goods.id)}>删除</Button>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({ goodsList: state.cart.storeHouse })

const mapDispatchToProps = { addGoods, delGoods, editGoods }

export default connect(mapStateToProps, mapDispatchToProps)(StoreHouse)

