import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class index extends Component {
  render() {
    const { list } = this.props
    return (
      <ul className='list-wrap'>
        {
          list.map(v => {
            return <Item
              key={v.id}
              item={v}
              emitChangeCheckd={this.props.emitChangeCheckd}
              emitModifyTask={this.props.emitModifyTask}
              emitDeleteItem={this.props.emitDeleteTask} />
          })
        }
      </ul>
    )
  }
}
