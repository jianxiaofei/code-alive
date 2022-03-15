import React, { Component } from 'react'
import { Consumer } from './index'

export default class A extends Component {
  render() {
    return (
      <Consumer>
        {val=>val}
      </Consumer>
    )
  }
}
