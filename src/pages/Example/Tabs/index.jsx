import React, { useState } from 'react';
import { Tabs } from 'antd';
import './index.less';

function AntdTabs() {
  const { TabPane } = Tabs;
  return (
    <>
      <h5>#antdTabs组件</h5>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Card Tab 1" key="1">
          Content of card tab 1
        </TabPane>
        <TabPane tab="Card Tab 2" key="2">
          Content of card tab 2
        </TabPane>
        <TabPane tab="Card Tab 3" key="3">
          Content of card tab 3
        </TabPane>
      </Tabs>
    </>
  );
}

export default function SimpleTabs() {
  const [tabs, setTabs] = useState([
    { title: 'tab1', id: '1', active: true },
    { title: 'tab2', id: '2' },
    { title: 'tab3', id: '3' },
  ]);

  const changeTab = tab => {
    const newTabs = tabs.map(v => ({ ...v, active: tab.id === v.id }));
    setTabs([...newTabs]);
  };
  return (
    <>
      <div>
        <h5>#最简单的案例</h5>
        <ul className="nav">
          {tabs.map(v => {
            return (
              <li onClick={() => changeTab(v)} className={v.active ? 'active' : ''} key={v.id}>
                {v.title}
              </li>
            );
          })}
        </ul>
        <div className="content">{tabs.find(v => v.active).title}</div>
      </div>
      <AntdTabs />
    </>
  );
}
