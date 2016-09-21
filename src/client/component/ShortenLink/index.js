import React, { Component } from 'react'

export default class ShortenLink extends Component {
  constructor(props) {
    super(props)
    this.state = {title: props.title, error: ''}
  }

  handleClick() {
    Meteor.call('links.insert', this.refs.input.value, (error) => {
      if (error) {
        console.log('links.insert error: ', error)
        return this.setState({error: 'Not valid url'})
      }

      this.setState({error: ''})
    })
  }

  render() {
    return (
      <div className="container">
        <h2 className="title">{this.state.title}</h2>
        <input
          ref="input"
          className="input"
          type="text"
          placeholder="http://longlonglongaddress.com"/>
        <h3 className="error">{this.state.error}</h3>
        <button
          className="submit"
          type="button"
          onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
    )
  }
}
