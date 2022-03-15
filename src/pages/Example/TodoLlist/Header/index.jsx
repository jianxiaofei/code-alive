import React, { Component } from 'react'
import './index.css'

export default class Header extends Component {
  render() {
    return (
      <input
        className='header'
        type="text"
        onKeyUp={this.handleChange}
        placeholder='请输入要执行的任务名称...' />
    )
  }
  handleChange = ({ target, keyCode }) => {
    const { value } = target;
    // 不能添加空任务||安静回车触发添加
    if (value === '' || keyCode !== 13) return;
    // 触发新增任务
    this.props.emitChangeValue(value, keyCode)
    target.value = ''
  };
}
