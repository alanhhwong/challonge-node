const assert = require('chai').assert;
const expect = require('chai').expect;
import ChallongeAPI from '../src/challonge';

const challonge = ChallongeAPI.withAPIKey('<API_KEY>');

describe('Participants', function() {
  let tid = '';
  let pid = '';

  describe('Tournament#create()', function() {
    it('should return success with tournament id', function() {
      return challonge.tournaments.create('alantest', 'alantest_url').then(function(tournament) {
        expect(tournament).to.have.property('id');
        tid = tournament.id;
      });
    });
  });

  describe('#create()', function() {
    it('should return participant id', function() {
      return challonge.participants.create(tid, 'UserA').then(function(participant) {
        expect(participant).to.have.property('id');
        pid = participant.id;
      });
    });
  });

  describe('#index()', function() {
    it('should return one participant count', function() {
      return challonge.participants.index(tid).then(function(participants) {
        expect(participants.length).to.equal(1);
      });
    });
  });

  describe('#show()', function() {
    it('should return correct participant', function() {
      return challonge.participants.show(tid, pid).then(function(participant) {
        expect(participant.id).to.equal(pid);
      });
    });
  });

  describe('#update()', function() {
    it('should return updated participant', function() {
      let params = {
        participant: {
          name: 'update_test',
        }
      }

      return challonge.participants.update(tid, pid, params).then(function(participant) {
        expect(participant.name).to.equal('update_test');
      });
    });
  });

  describe('#delete()', function() {
    it('should return deleted participant', function() {
      return challonge.participants.delete(tid, pid).then(function(participant) {
        expect(participant.id).to.equal(pid);
      });
    });
  });

  describe('Tournament#delete()', function() {
    it('should resolve', function() {
      return challonge.tournaments.destroy(tid);
    });
  });

});
