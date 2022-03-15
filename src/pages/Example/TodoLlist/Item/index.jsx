import React, { Component } from 'react';
import './index.css';

export default class Item extends Component {
  state = { isHover: false, isChange: false, tempVal: this.props.item.task };
  render() {
    const { item } = this.props;
    const { isHover, isChange, tempVal } = this.state;
    return (
      <li onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <label>
          <input type="checkbox" onChange={this.handleChangeChecked} checked={item.done} />
          {isChange ? <input type="tempVal" value={tempVal} onChange={this.handleChangeTask} onKeyUp={this.sureChangeTaskName} /> : <span>{item.task}</span>}
        </label>
        <span style={{ display: isHover ? 'block' : 'none' }}>
          <button onClick={isChange ? this.handleCancelEdit : this.handleClickEditBtn}>{isChange ? '取消' : '修改'}</button>
          <button style={{ marginLeft: '6px' }} onClick={this.handleClickDelete}>
            删除
          </button>
        </span>
      </li>
    );
  }
  handleCancelEdit = () => {
    this.setState({ isChange: false });
  };
  handleChangeTask = e => {
    this.setState({ tempVal: e.target.value });
  };
  sureChangeTaskName = e => {
    if (!(e.keyCode === 13 && window.confirm('是否确认修改？'))) return;
    this.props.emitModifyTask(this.props.item.id, this.state.tempVal);
    this.setState({ isChange: false });
  };
  handleClickEditBtn = () => {
    this.setState({ isChange: true });
  };
  handleMouseEnter = () => {
    this.setState({ isHover: true });
  };
  handleMouseLeave = () => {
    this.setState({ isHover: false });
  };
  handleChangeChecked = e => {
    const { id } = this.props.item;
    this.props.emitChangeCheckd(e.target.checked, id);
  };
  handleClickDelete = () => {
    window.confirm('是否确认清除当前任务？') && this.props.emitDeleteItem(this.props.item.id);
  };
}
