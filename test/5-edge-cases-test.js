/* eslint-env node, mocha */
/* global before, after, describe, it */

var assert = require('assert');
var wpPot = require('../');
var testHelper = require('./test-helper');

var fixturePath = 'test/fixtures/edge-cases.php';

describe('Edge cases function tests', function () {
  var potContents;

  before(function () {
    potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      domain: 'testdomain'
    });
  });

  it('should handle strings with escaped single quotes', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':2', "It's escaped", false, false));
  });

  it('should handle strings with unescaped double quotes within single quotes', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':3', "It's escaped", false, false));
  });

  it('should handle strings with escaped double quotes', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':4', 'This is "escaped"', false, false));
  });

  it('should handle strings with line breaks in function argument', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':5', 'This is "escaped"', false, false));
  });

  it('should handle strings with line breaks in function call', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':6', '"\n"New\\n"\n"Line', false, false));
  });

  it('should handle strings with line breaks in function call', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':8', '"\n"New\\n"\n"Line', false, false));
  });

  it('should handle plural methods with non-integer value as count', function () {
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':13', 'Singular string', 'Plural string', false));
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':14', 'Singular string', 'Plural string', false));
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':15', 'Singular string', 'Plural string', false));
  });
});

describe('Edge cases domain tests', function () {
  it('should handle strings with domain set as variable', function () {
    var potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      domain: '$test'
    });
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':16', 'Domain is a variable', false, false));
  });

  it('should handle strings with domain set as a constant', function () {
    var potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      domain: '$this->test'
    });
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':17', 'Domain is a object variable', false, false));
  });

  it('should handle strings with domain set as a constant', function () {
    var potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      domain: '$this::test'
    });
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':18', 'Domain is a static class variable', false, false));
  });

  it('should handle strings with domain set as a constant', function () {
    var potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      domain: 'TEST'
    });
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':19', 'Domain is a constant', false, false));
  });

  it('should not include methods without domain when domain is set', function () {
    var potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      domain: 'TEST'
    });
    assert(!testHelper.verifyLanguageBlock(potContents, false, false, 'Missing domain', false, false));
  });
});