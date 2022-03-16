import React, { useState } from 'react'
import { Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js';
import './index.less'

export default function LayoutHeader() {
  const [collapsed, setCollapsed] = useState()
  const toggle = () => {
    const tempCollapsed = !collapsed;
    setCollapsed(tempCollapsed)
    PubSub.publish("sider-collapsed", tempCollapsed)
  };

  return (
    <>
      <div className='header-left-wrap'>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          { className: 'menu-collapsed', onClick: toggle }
        )}
        <h2 className='site-title'>程序生涯技术博客</h2>
      </div>
      <div className='user-wrap'>
        <div>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span>欢迎 admin</span>
        </div>
        <span className='btn-exit'>退出</span>
      </div>
    </>
  )
}
