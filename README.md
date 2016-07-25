# challonge-node

A node.js library for [Challonge API](http://api.challonge.com/v1)

## Requirements
Tested with:
* Node 4.4.4
* npm 2.15.1

### Installation
```js
npm install --save challonge-node
```

### Usage
See tests for full usage
#### Setup
```js
var ChallongeAPI = require('challonge-node');
var challonge = ChallongeAPI.withAPIKey(<API_KEY>);
```
or
```js
import ChallongeAPI from 'challonge-node';
const challonge = ChallongeAPI.withAPIKey(<API_KEY>);
```

#### Create tournament
```js
challonge.tournaments.create(<NAME>, <URL>).then(function(tournament) {
  console.log(tournament.id);
}
```

## Testing
```js
npm run test
```

## License

challonge-node is available under the MIT license. See the LICENSE file for more info.
