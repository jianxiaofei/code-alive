import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Header from './Header';
import List from './List';
import Footer from './Footer';
import './index.less';

export default class TodoList extends Component {
  state = {
    list: [
      { id: 0, task: '10点练瑜伽', done: false },
      { id: 1, task: '9点打篮球', done: false },
      { id: 2, task: '7点早起', done: true },
    ],
  };
  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <fieldset className="container">
          <legend>每日任务卡</legend>
          <Header emitChangeValue={this.handleaddTast} />
          <List list={list} emitChangeCheckd={this.handleChangeTask} emitDeleteTask={this.handleDeleteTask} emitModifyTask={this.handleModifyCurrentTask} />
          <Footer task={list} emitDelAllTast={this.handleDelAllTask} emitChangeCheckAll={this.handleCheckAll} />
        </fieldset>
      </div>
    );
  }
  // 改变任务名称
  handleModifyCurrentTask = (id, val) => {
    const { list } = this.state;
    const newList = list.map(v => {
      return { ...v, task: v.id === id ? val : v.task };
    });

    this.setState({ list: newList });
  };
  // 全选/不全选
  handleCheckAll = bol => {
    const { list } = this.state;
    this.setState({ list: list.map(v => ({ ...v, done: bol })) });
  };
  // 清空全部任务
  handleDelAllTask = () => {
    this.setState({ list: [] });
  };
  // 删除任务
  handleDeleteTask = id => {
    const { list } = this.state;
    this.setState({ list: list.filter(v => v.id !== id) });
  };
  // 新增任务
  handleaddTast = (val) => {
    const taskItem = { id: nanoid(), task: val, done: false };
    this.setState({
      list: [taskItem, ...this.state.list],
    });
  };
  // 改变任务完成情况
  handleChangeTask = (bol, id) => {
    const { list } = this.state;
    const newTaskList = list.map(v => {
      const done = v.id === id ? bol : v.done;
      return { ...v, done };
    });
    this.setState({ list: newTaskList });
  };
}
