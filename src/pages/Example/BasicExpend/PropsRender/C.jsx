import React, { Component } from 'react'

export default class C extends Component {
  render() {
    return (
      <div>
        C
        {this.props.data}
      </div>
    )
  }
}
