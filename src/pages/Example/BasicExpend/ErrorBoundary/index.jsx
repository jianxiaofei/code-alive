import React, { Component } from 'react'
import A from './A'

export default class index extends Component {
  static getDerivedStateFromError(error) {
    console.log(error)
  }
  componentDidCatch(error, info) {
    console.log(error, info)
  }
  render() {
    return (
      <div><A />123 </div>
    )
  }
}
