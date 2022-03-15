import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $axios from 'axios';
import './index.css';

export default class index extends Component {
  state = { list: [], isLoading: false, isNull: false, isError: false, error: '', isFirstEnter: true };
  componentDidMount() {
    PubSub.subscribe('search', (_, keyword) => {
      this.setState({ isLoading: true, isFirstEnter: false });
      this.getSearchList(keyword);
    });

    PubSub.subscribe('clear', this.clearResultList);
  }
  componentWillUnmount() {
    PubSub.clearAllSubscriptions();
  }
  // fetch请求
  getSearchList = async keyword => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${keyword}`);
      const { items: list } = await response.json();

      this.setState({ list, isLoading: false, isNull: list.length === 0 });
    } catch (error) {
      this.setState({ isLoading: false, isError: true, error: error.message });
    }
  };

  // axios请求;
  getSearchList1 = () => {
    $axios
      .get('data/test.json')
      .then(res => {
        const { list } = res.data;
        this.setState({ list, isLoading: false, isNull: list.length === 0 });
      })
      .catch(error => this.setState({ isLoading: false, isError: true, error: error.message }));
  };

  clearResultList = () => {
    this.setState({ list: [], isFirstEnter: true });
  };
  render() {
    const { list, isFirstEnter: a, isError: b, isLoading: c, isNull: d, error } = this.state;
    const exception = (a && '请在输入框中搜索关键字搜索github想要的内容。') || (b && error) || (c && 'loading……') || (d && '内容为空');

    return (
      <div className="list-wrap">
        {exception ? (
          <h2>{exception}</h2>
        ) : (
          <ul className="result-list">
            {list.map(v => {
              return (
                <li key={v.id}>
                  <a href={v.html_url}>
                    <img className="user-avatar" src={v.avatar_url} alt={v.login} />
                    <div className="user-name">{v.login}</div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
