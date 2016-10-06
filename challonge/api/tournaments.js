'use strict'

let _api = new WeakMap();

export default class Tournaments {

  constructor(parent) {
      _api = parent;
  }

  index() {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('GET', 'tournaments.json', params)
        .then(function (response) {
          //remove 1st layer "tournament"
          resolve(response.map(function(obj) {
            return obj.tournament;
          }));
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  create(name, url, tournament_type = 'single elimination') {
    let params = {
      name: name,
      tournament_type: tournament_type,
      url: url,
    }

    return new Promise((resolve, reject) => {
      _api.request('POST', 'tournaments.json', params)
        .then(function (response) {
          resolve(response.tournament);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  show(tid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('GET', 'tournaments/'+tid+'.json', params)
        .then(function (response) {
          resolve(response.tournament);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  //http://api.challonge.com/v1/documents/tournaments/update
  update(tid, params) {
    return new Promise((resolve, reject) => {
      _api.request('PUT', 'tournaments/'+tid+'.json', params)
        .then(function (response) {
          resolve(response.tournament);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  destroy(tid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('DELETE', 'tournaments/'+tid+'.json', params)
        .then(function (response) {
          response.tournament.id === tid ? resolve() : reject('Mismatch IDs');
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  start(tid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('POST', 'tournaments/'+tid+'/start.json', params)
        .then(function (response) {
          response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  reset(tid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('POST', 'tournaments/'+tid+'/reset.json', params)
        .then(function (response) {
          response.tournament.id === tid ? resolve(response.tournament) : reject('Mistmatch IDs');
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }
}
