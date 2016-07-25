'use strict'

let _api = new WeakMap();

export default class Participants {

  constructor(parent) {
      _api = parent;
  }

  index(tid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('GET', 'tournaments/'+tid+'/participants.json', params)
        .then(function (response) {
          //remove 1st layer "participant"
          resolve(response.map(function(obj) {
            return obj.participant;
          }));
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  create(tid, name) {
    let params = {
      name: name,
    }

    return new Promise((resolve, reject) => {
      _api.request('POST', 'tournaments/'+tid+'/participants.json', params)
        .then(function (response) {
            resolve(response.participant);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  show(tid, pid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('GET', 'tournaments/'+tid+'/participants/'+pid+'.json', params)
        .then(function (response) {
            resolve(response.participant);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  //http://api.challonge.com/v1/documents/participants/update
  update(tid, pid, params) {
    return new Promise((resolve, reject) => {
      _api.request('PUT', 'tournaments/'+tid+'/participants/'+pid+'.json', params)
        .then(function (response) {
            resolve(response.participant);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

  delete(tid, pid) {
    let params = {};

    return new Promise((resolve, reject) => {
      _api.request('DELETE', 'tournaments/'+tid+'/participants/'+pid+'.json', params)
        .then(function (response) {
            resolve(response.participant);
        })
        .catch(function (err) {
          reject(err.message);
        });
    });
  }

}
