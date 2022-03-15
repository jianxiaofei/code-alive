import React, { Component } from 'react'

export default class SetState extends Component {
  state = { count: 0 }
  add = () => {
    // setState的多种使用方法
    // 1.this.setState({ count: this.state.count + 1 })

    // 2.this.setState({ count: this.state.count + 1 }, () => {
    //   console.log(this.state.count)
    // })

    //3. this.setState((state, props) => {
    //   console.log(state.count, props)
    //   return { count: state.count + 1 }
    // })
  }
  render() {
    return (
      <div>
        {this.state.count} <br />
        <button onClick={this.add}>点我加1</button>
      </div>
    )
  }
}
