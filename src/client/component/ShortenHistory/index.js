import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Links } from '../../../imports/collections/links'

class ShortenHistory extends Component {
  constructor(props) {
    super(props)

  }

  renderRow({url, token, clicks}) {
    const shortenLink = `http://localhost:3000/${token}`
    return (
      <tr key={token}>
        <td><a href={url}>{url}</a></td>
        <td><a href={shortenLink}>{shortenLink}</a></td>
        <td>{clicks}</td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h2>Shoten History</h2>
        <table>
          <tbody>
            <tr>
              <th>Original URL</th>
              <th>Shorened URL</th>
              <th>Number of Clicks</th>
            </tr>
            {this.props.links.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('links')
  return { links: Links.find({}).fetch() }
}, ShortenHistory)
