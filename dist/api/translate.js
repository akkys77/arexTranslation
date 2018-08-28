'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res) {
  // let term = req.params.term;
  // res.status(200).json({ in: 'translate', term });
  var result = processString(str);
  res.status(200).json({ result: result });
  console.log(result);
};

// Rule for both upper and lower case vowels


var rule01 = {
  regex: /\b([aeiouAEIOU]\w*?)\b/g,
  // Naive implementation, not consiring upper/ lower case
  // subst: '$1way'
  subst: function subst($0, $1) {
    $1 = $1.charAt(0).toLowerCase() + $1.substr(1);
    var result = $1 + 'way';
    // If the word was originally entirely in upper case, the result should be upper case
    if (/^[A-Z]*$/.test($0)) {
      return result.toUpperCase();
    }
    return result;
  }
};
// Rule for upper case consonants
var rule02a = {
  regex: /\b([^AEIOUQ\W]\w*?|Qu\w*?|QU\w*?)([aeiouyAEIOUQ]\w*)\b/g,
  // Naive implementation, not consiring upper/ lower case
  // subst: '$2$1ay'
  subst: function subst($0, $1, $2) {
    $1 = $1.charAt(0).toLowerCase() + $1.substr(1);
    $2 = $2.charAt(0).toUpperCase() + $2.substr(1);
    var result = $2 + $1 + 'ay';
    // If the word was originally entirely in upper case, the result should be upper case
    if (/^[A-Z]*$/.test($0)) {
      return result.toUpperCase();
    }
    return result;
  }
};
// Rule for lower case consonants
var rule02b = {
  regex: /\b([^aeiouq\W]\w*?|qu\w*?)([aeiouyAEIOUQ]\w*)\b/g,
  subst: '$2$1ay'
};

var startWithVowel = function startWithVowel(str) {
  var pattern = /^[aeiou|AEIOU]/;
  if (pattern.test(str)) {
    return true;
  } else return false;
};

var startWithUpperCase = function startWithUpperCase(str) {
  var pattern = /^[A-Z]/;
  // console.log(str);
  if (pattern.test(str)) {
    return true;
  } else return false;
};

var str = 'quiet\nyellow\nstyle\nChallenge the status quo\nRoses are \xA1red!, violets\xB9 are blue\nHe is 2 years old@gmail.com\nThe design is state-of-the-art\nin a sentence suddenly HELLO all caps.\nin a sentence suddenly Hello starting caps.\nin a sentence suddenly hello no caps.\nin a sentence suddenly hELLO aWAY no caps.\nAn off-campus apartment ?\nDisquite\nMY HOME IS AWAY';

var applySelectedRule = function applySelectedRule(rule, str) {
  var regex = rule.regex,
      subst = rule.subst;

  var result = str.replace(regex, subst);
  return result;
};

var translateWord = function translateWord(word) {
  if (startWithVowel(word)) {
    return applySelectedRule(rule01, word);
  } else {
    if (startWithUpperCase(word)) {
      // console.log('Starts with Upper case: ',word);
      return applySelectedRule(rule02a, word);
    } else {
      // console.log('Starts with Lower case: ',word);
      return applySelectedRule(rule02b, word);
    }
  }
};

var processString = function processString(str) {
  // Split each line into an array
  var lines = str.split('\n');
  // return translated lines
  var translatedLines = lines.map(function (line) {
    // For each line, split each word into an array of words
    var words = line.replace(/([^a-z0-9-,\s])/, '$1').split(' ');
    // For each line, return array of translated words
    var translatedWords = words.map(function (word) {
      // We need to consider hyphenated words as mulitple words
      // Check if there is an hyphen and handle this special case
      if (/-/.test(word)) {
        var hyphenatedWord = word.split('-');
        return hyphenatedWord
        // Handle hyphenated words
        .map(function (partOfHyphenatedWord) {
          return translateWord(partOfHyphenatedWord);
        })
        // Rebuild hyphenated text string from array
        .join('-');
      } else {
        // Handle non hyphenated words
        return translateWord(word);
      }
    });
    // convert array of translated lines to a string
    var translatedWordsString = translatedWords.join(' ');
    // console.log(translatedWordsString);
    return translatedWordsString;
  });
  // convert array of lines to string
  return translatedLines.join('\n');
};
//# sourceMappingURL=translate.js.map