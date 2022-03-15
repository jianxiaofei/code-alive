import React, { Component } from 'react'
import A from './A'
import B from './B'
import C from './C'

export default class index extends Component {
  render() {
    return (
      <div>
        {/* 如何向C传递A的数据
        <A >
          <C />
        </A> */}
        {/* 改成这样 */}
        <A render={(data) => <C data={data} />} />
        <B>
          <C />
        </B>
      </div>
    )
  }
}
