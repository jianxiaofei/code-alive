import React, { Component } from 'react'
import A from './A'
export const { Provider, Consumer } = React.createContext();

export default class Context extends Component {
  state = { num: 123 }
  render() {
    return (
      <>
        <Provider value={this.state.num}>
          <A />
        </Provider>
        <button onClick={() => this.setState({ num: this.state.num + 1 })}>点我改变数字</button>
      </>
    )
  }
}
