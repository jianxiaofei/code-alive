import React, { Component, Fragment } from 'react'

export default class Index extends Component {
  state = { list: [1, 2, 34, 5] }
  render() {
    return (
      <>
        {this.state.list.map((item, index) => {
          return <Fragment key={index}>{item}</Fragment>
        })}
      </>
    )
  }
}
