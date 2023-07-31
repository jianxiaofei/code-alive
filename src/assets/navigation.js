import React from 'react';
import {
  HomeOutlined,
  ChromeOutlined,
  InfoCircleOutlined,
  TableOutlined,
  CarOutlined,
  PullRequestOutlined,
  OrderedListOutlined,
  WalletOutlined,
} from '@ant-design/icons';

// 菜单数据
export default (function () {
  return [
    { key: '0', title: 'home', url: 'home', icon: <HomeOutlined />, children: [] },
    { key: '8', title: 'tabs切换', url: 'tabs', icon: <InfoCircleOutlined />, children: [] },
    { key: '1', title: 'antd组件table', url: 'table', icon: <TableOutlined />, children: [] },
    { key: '2', title: 'todo-list', url: 'todo-list', icon: <OrderedListOutlined />, children: [] },
    {
      key: 'games',
      title: 'web游戏',
      icon: <WalletOutlined />,
      children: [
        { key: '3-1', title: '🏃跨栏', url: 'web-game/hurdle', icon: <ChromeOutlined />, children: [] },
        { key: '3-2', title: '垃圾分类', url: 'web-game/garbageClassification', icon: <ChromeOutlined />, children: [] },
      ],
    },
    { key: '4', title: '购物车案例', url: 'cart', icon: <CarOutlined />, children: [] },
    { key: '5', title: 'github基础数据请求', url: 'basic-request', icon: <PullRequestOutlined />, children: [] },
    { key: '7', title: 'about', url: 'about', icon: <InfoCircleOutlined />, children: [] },
  ];
})();
