import React, { Component } from 'react';
import Search from './Search';
import List from './List';
import './index.less';

export default class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <List />
      </div>
    );
  }
}
