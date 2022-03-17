import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PubSub from 'pubsub-js';
// import Icon from '../Icon'; // 动态引入加大了体量
import navList from '../../assets/navigation';
import './index.less';

const { SubMenu } = Menu;

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
        <Menu.Item key={key} state={{ url, key, title }} icon={icon}>
          {item.url ? <Link to={url}>{title}</Link> : title}
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu key={key} title={title} icon={icon}>
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
  const subKeyList = ['games']; // 可打开菜单列表

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
    const menu = loopFindMenu(pathname.slice(1), navList);
    // 设置初始侧边栏选中
    setSelectedKeys([menu?.key]);
    // 设置初始展开菜单
    setOpenKeys([sessionStorage.getItem('openKeys')]);
    // 发布初次选中项
    setTimeout(() => PubSub.publish('menu-selected', menu || navList[0]), 50);
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
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        onSelect={selectMenuItem}
      >
        {loopSubMenu(navList)}
      </Menu>
    </Layout.Sider>
  );
}
