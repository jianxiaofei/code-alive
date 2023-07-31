import React, { Component } from 'react';
import { Timeline } from 'antd';

export default class Home extends Component {
  state = { list: [] };
  // fetch请求
  getSearchList = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/jianxiaofei/code-alive/commits`);
      const list = await response.json();

      if (list && list.length) this.setState({ list });
    } catch (error) {
      // this.setState({ isLoading: false, isError: true, error: error.message });
      console.log(error);
    }
  };
  componentDidMount() {
    this.getSearchList();
  }
  render() {
    const { list = [] } = this.state;
    
    return (
      <>
        <h5 style={{ textAlign: 'center', paddingTop: '30px', marginBottom: '20px' }}>
          -----------------------------------当前仓库提交记录---------------------------------
        </h5>
        <Timeline mode="left">
          {list.map(cmtObj => {
            const {
              node_id,
              commit: { committer, message },
            } = cmtObj;
            return (
              <Timeline.Item key={node_id} label={new Date(committer.date).toLocaleString()}>
                {message}
              </Timeline.Item>
            );
          })}
        </Timeline>
      </>
    );
  }
}
