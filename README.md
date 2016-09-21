# ShortenMyLink

Implemention of shorten my link service by Meteor.  
Follow tutorial of [StephenGrider/MeteorCasts](https://github.com/StephenGrider/MeteorCasts)  
from [branch 060-project-overview](https://github.com/StephenGrider/MeteorCasts/tree/060-project-overview) to [branch 080-updating-records](https://github.com/StephenGrider/MeteorCasts/tree/080-updating-records)

# How to run?
1. [install Meteor](https://www.meteor.com/install)
2. git clone this repository
3. open Termianl, go to this directory, and run `meteor`
4. open Browser and enter `http://localhost:3000`

# input shorten link on browser flow:
server side
1. intercept connection by `WebApp.connectHandlers.use(middleware)`
2. middleware will extract connection by `token` and send it to onRoute
  ``
  const middleware = ConnectRoute((router) => {
    router.get('/:token', onRoute)
  })
  ``
3. onRoute will query token in db
3.1 if token exists -> update clicks count on db -> set redirect on response
3.2 if token do not exist -> call `next()` to let next middleware(React component) hanlde it

# shorten link flow:
1. input long address and click submit

client side  
2. call `Meteor.call('links.insert', this.refs.input.value, (error) => {})

db side
3. check url format by `check(url, Match.Where(url => validUrl.isUri(url)))`
  3.1.1 if format is wrong, raise exception to error callback at #2.

  client side  
  3.1.2 error callback will call `setState` to set error information and render to UI

  db side  
  3.2 if the format is correct -> generate token -> save origin url, token, clicks: 0, to db

server side
4. meteor publish data by `Meteor.publish('links', () => (Links.find({})))`

client side
5. meteor received subscribe data from server and send it to `ShortenHistory` by `props`
6. render link data that just created

# Commands that are used in this tutorial
```
meteor npm install --save react react-dom

meteor remove insecure
meteor remove autopublish

meteor npm install --save react-addons-pure-render-mixin
meteor add react-meteor-data
meteor npm install --save connect-route
```

# TODO
1. Refactor it to [Cycle.js](https://github.com/cyclejs/cyclejs), to be more funcational way
