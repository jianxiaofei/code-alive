import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import tool from '@/utils/tool';
import './index.css';

export default class Search extends Component {
  clear = () => {
    this.keywordRef.value = '';
    PubSub.publish('clear');
  };
  search = () => {
    const { value } = this.keywordRef;
    if (value === '') return;
    PubSub.publish('search', value);
  };

  componentDidMount() {
    tool.addWaterMarker('jianxiaofei');
  }
  render() {
    return (
      <div className="search-wrap">
        <div className="search-inner">
          <input type="text" placeholder="输入你要搜索的内容..." ref={c => (this.keywordRef = c)} onKeyUp={e => e.keyCode === 13 && this.search()} />
          <button onClick={this.search}>🔍搜索</button>
          <button style={{ marginLeft: '6px' }} onClick={this.clear}>
            清空结果
          </button>
        </div>
      </div>
    );
  }
}
