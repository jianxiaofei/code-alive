import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PubSub from 'pubsub-js';
import { PaperClipOutlined, HomeOutlined, InfoCircleOutlined, TableOutlined, UnorderedListOutlined, TagsOutlined } from '@ant-design/icons';
import './index.less';
const { SubMenu } = Menu;

// 模拟菜单数据
const mockList = (function () {
  const subList = [
    { key: '0', title: 'home', url: 'home', icon: <HomeOutlined />, children: [] },
    { key: '8', title: 'tabs切换', url: 'tabs', icon: <InfoCircleOutlined />, children: [] },
    { key: '1', title: 'antd组件table', url: 'table', icon: <TableOutlined />, children: [] },
    { key: '2', title: 'todo-list', url: 'todo-list', icon: <TableOutlined />, children: [] },
    { key: '3', title: 'sub Menu One', icon: <UnorderedListOutlined />, children: [] },
    { key: '4', title: '购物车案例', url: 'cart', icon: <UnorderedListOutlined />, children: [] },
    { key: '5', title: 'github基础数据请求', url: 'basic-request', icon: <UnorderedListOutlined />, children: [] },
    { key: '7', title: 'about', url: 'about', icon: <InfoCircleOutlined />, children: [] },
    { key: '6', title: 'sub Menu two', icon: <UnorderedListOutlined />, children: [] },
  ];

  Array.from({ length: 30 }, (v, i) => {
    i += subList.length;
    const item = { key: String(i), url: `options-${i}`, title: `options-${i}`, children: [] };
    const subOne = subList.find(j => j.title === 'sub Menu One');
    const subTwo = subList.find(j => j.title === 'sub Menu two');
    
    (i < 10 ? subOne : subTwo).children.push(item);
  });

  return subList;
})();

// 递归查找菜单
const loopFindMenu = (name, list) => {
  let result = null;
  for (let i = 0; i < list.length; i++) {
    const menu = list[i];
    if (menu.url === name) {
      result = menu;
      return menu;
    } else {
      if (menu.children.length > 0) {
        result = loopFindMenu(name, menu.children);
        if (result) return result;
      }
    }
  }
  return result;
};

// 递归渲染菜单
const loopSubMenu = menuList => {
  return menuList.map(item => {
    const { url, key, title, icon, children } = item;
    if (!children.length) {
      return (
        <Menu.Item key={key} state={{ url, key, title }} icon={icon || <PaperClipOutlined />}>
          {item.url ? <Link to={url}>{title}</Link> : title}
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu key={key} title={title} icon={icon || <TagsOutlined />}>
          {loopSubMenu(children)}
        </SubMenu>
      );
    }
  });
};

export default function LayoutSider() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const subKeyList = ['4', '7']; // 可打开菜单列表

  const selectMenuItem = e => {
    const { selectedKeys: keys, item } = e;
    setSelectedKeys(keys);
    PubSub.publish('menu-selected', item.props.state);
  };

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (subKeyList.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      sessionStorage.setItem('openKeys', latestOpenKey);
    }
  };

  useEffect(() => {
    // 遍历得到初始选择菜单
    const menu = loopFindMenu(pathname.slice(1), mockList);
    // 设置初始侧边栏选中
    setSelectedKeys([menu?.key]);
    // 设置初始展开菜单
    setOpenKeys([sessionStorage.getItem('openKeys')]);
    // 发布初次选中项
    setTimeout(() => PubSub.publish('menu-selected', menu || mockList[0]), 50);
    // 订阅折叠侧边栏按钮变化
    PubSub.subscribe('sider-collapsed', (_, bol) => setCollapsed(bol));
    // 订阅导航标签变化
    PubSub.subscribe('change-tags', (_, key) => {
      setSelectedKeys([key]);
      setOpenKeys();
    });
    // 取消订阅
    return () => {
      PubSub.unsubscribe('change-tags');
      PubSub.unsubscribe('sider-collapsed');
    };
  }, []);

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <img src={require('@/assets/jxfstyle.png')} className="logo" />
      <Menu theme="dark" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} selectedKeys={selectedKeys} onSelect={selectMenuItem}>
        {loopSubMenu(mockList)}
      </Menu>
    </Layout.Sider>
  );
}
