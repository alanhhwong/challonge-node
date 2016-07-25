const assert = require('chai').assert;
const expect = require('chai').expect;
import ChallongeAPI from '../src/challonge';

const challonge = ChallongeAPI.withAPIKey('<API_KEY>');

describe('Matches', function() {
  let tid = '';
  let pid = [];
  let _matches = [];

  describe('Tournament#create()', function() {
    it('should return success with tournament id', function() {
      return challonge.tournaments.create('alantest', 'alantest_url').then(function(tournament) {
        expect(tournament).to.have.property('id');
        tid = tournament.id;
      });
    });
  });

  describe('Participant#create()', function() {
    it('should return participant id', function() {
      let pArray = [];
      for (let i = 0; i < 4; i++) {
        let p = challonge.participants.create(tid, 'User ' + i).then(function(participant) {
          expect(participant).to.have.property('id');
          pid.push(participant.id);
        });
        pArray.push(p);
      }
      return Promise.all(pArray);
    });
  });

  describe('Tournament#start()', function() {
    it('should resolve', function() {
      return challonge.tournaments.start(tid).then(function(tournament) {
        expect(tournament.state).to.equal('underway');
      });
    });
  });

  describe('#index()', function() {
    it('should get 3 matches (4 test users)', function() {
      return challonge.matches.index(tid).then(function(matches) {
        expect(matches.length).to.equal(3);
        _matches = matches;
      });
    });
  });

  describe('#show()', function() {
    it('should retrieve correct match', function() {
      return challonge.matches.show(tid, _matches[0].id).then(function(match) {
        expect(match.id).to.equal(_matches[0].id);
      });
    });
  });

  describe('#update()', function() {
    it('should update match correctly', function() {
      let params = {
        match: {
          scores_csv: '2-1,1-2,3-2',
          winner_id: _matches[0].player1_id
        }
      }
      return challonge.matches.update(tid, _matches[0].id, params).then(function(match) {
        expect(match.id).to.equal(_matches[0].id);
      });
    });
  });

  describe('Tournament#delete()', function() {
    it('should resolve', function() {
      return challonge.tournaments.destroy(tid);
    });
  });

});
