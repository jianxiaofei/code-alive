import React, { Component } from 'react'

export default class A extends Component {
  state = { num: 1232 }
  render() {
    return (
      <div>A
        {this.props.render(this.state.num)}
      </div>
    )
  }
}
