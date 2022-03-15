import React, { useState } from 'react';
import './index.less';

export default function Tabs() {
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
    </>
  );
}
