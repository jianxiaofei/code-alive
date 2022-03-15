import React, { Component, lazy, Suspense } from 'react'
import { Tabs } from 'antd'
const A = lazy(() => import('./A'))
const B = lazy(() => import('./B'))

export default class LazyLoad extends Component {
  co
  render() {
    return (
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane key="1" tab="A组件">
          <Suspense fallback="loading">
            <A />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane key='2' tab="B组件">
          <Suspense fallback="loading">
            <B />
          </Suspense>
        </Tabs.TabPane>
      </Tabs>
    )
  }
}
