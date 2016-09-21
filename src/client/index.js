import React from 'react'
import ReactDOM from 'react-dom'
import Header from './component/Header'
import ShortenLink from './component/ShortenLink'
import ShortenHistory from './component/ShortenHistory'

const App = () => (
  <div>
    <Header title="Shorten My Link"/>
    <ShortenLink title="Enter a link to shorten"/>
    <ShortenHistory />
  </div>
)

Meteor.startup(() => {
  ReactDOM.render(<App/>, document.getElementById('content'))
})
