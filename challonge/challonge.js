'use strict';
import Request from 'request-promise-native';
import Tournaments from './api/tournaments';
import Participants from './api/participants';
import Matches from './api/matches';

const CHALLONGE_API_BASE_URI = "https://api.challonge.com/v1/";
let _api_key = new WeakMap();

class ChallongeAPI {

  constructor(key) {
      _api_key = key;
  }

  request(method, uri, params) {
    params['api_key'] = _api_key;
    const options = {
      uri: CHALLONGE_API_BASE_URI + uri,
      method: method,
      qs: method==='GET' || method==='DELETE' || method==='PUT'? params : null,
      body: method==='POST' ? params: null,
      json: true,
    }

    return Request(options);
  }
}

exports.withAPIKey = function withAPIKey(key) {
    let instance = new ChallongeAPI(key);
    instance.tournaments = new Tournaments(instance);
    instance.participants = new Participants(instance);
    instance.matches = new Matches(instance);
    return instance;
}
