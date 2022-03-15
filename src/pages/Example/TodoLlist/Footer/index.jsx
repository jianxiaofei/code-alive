import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
  render() {
    const { task } = this.props
    const taskOverCount = task.filter((v) => v.done).length;
    return (
      <div>
        <label>
          <input type="checkbox" onChange={this.handleChangeChecked} checked={task.length === taskOverCount} />
          <span>{taskOverCount}已完成/{task.length}全部</span>
        </label>
        <button className='clear-all' onClick={this.handleClearAllTask}>清除全部任务</button>
      </div>

    )
  }
  handleClearAllTask = () => {
    window.confirm('是否确认清除全部任务？') && this.props.emitDelAllTast()
  };
  handleChangeChecked = (e) => {
    this.props.emitChangeCheckAll(e.target.checked)
  };
}
