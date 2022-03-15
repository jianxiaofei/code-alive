import React, { Component } from 'react'
import { Tabs } from 'antd';

export default class Home extends Component {
  render() {
    const { TabPane } = Tabs;
    return (
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
    )
  }
}
