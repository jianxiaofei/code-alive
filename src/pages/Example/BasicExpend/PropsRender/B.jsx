import React, { Component } from 'react'

export default class B extends Component {
  render() {
    return (
      <div>B
        {this.props.children}
      </div>
    )
  }
}
