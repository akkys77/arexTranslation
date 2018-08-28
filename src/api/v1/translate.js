export default (req, res) => {
  const str = req.body.textToTranslate;
  if (!str) {
    res.status(400).json({ message: 'missing text to translate in Pig Latin' });
  }
  let result = processString(str);
  res.status(200).json({ translatedString: result });
};

// Rule for both upper and lower case vowels
const rule01 = {
  regex: /\b([aeiouAEIOU]\w*?)\b/g,
  // Naive implementation, not consiring upper/ lower case
  // subst: '$1way'
  subst: ($0, $1) => {
    $1 = $1.charAt(0).toLowerCase() + $1.substr(1);
    let result = $1 + 'way';
    // If the word was originally entirely in upper case, the result should be upper case
    if (/^[A-Z]*$/.test($0)) {
      return result.toUpperCase();
    }
    return result;
  }
};
// Rule for upper case consonants
const rule02a = {
  regex: /\b([^AEIOUQ\W]\w*?|Qu\w*?|QU\w*?)([aeiouyAEIOUQ]\w*)\b/g,
  // Naive implementation, not consiring upper/ lower case
  // subst: '$2$1ay'
  subst: ($0, $1, $2) => {
    $1 = $1.charAt(0).toLowerCase() + $1.substr(1);
    $2 = $2.charAt(0).toUpperCase() + $2.substr(1);
    let result = $2 + $1 + 'ay';
    // If the word was originally entirely in upper case, the result should be upper case
    if (/^[A-Z]*$/.test($0)) {
      return result.toUpperCase();
    }
    return result;
  }
};
// Rule for lower case consonants
const rule02b = {
  regex: /\b([^aeiouq\W]\w*?|qu\w*?)([aeiouyAEIOUQ]\w*)\b/g,
  subst: '$2$1ay'
};

const startWithVowel = str => {
  let pattern = /^[aeiou|AEIOU]/;
  if (pattern.test(str)) {
    return true;
  } else return false;
};

const startWithUpperCase = str => {
  let pattern = /^[A-Z]/;
  // console.log(str);
  if (pattern.test(str)) {
    return true;
  } else return false;
};

const applySelectedRule = (rule, str) => {
  const { regex, subst } = rule;
  const result = str.replace(regex, subst);
  return result;
};

const translateWord = word => {
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

const processString = str => {
  // Split each line into an array
  let lines = str.split('\n');
  // return translated lines
  let translatedLines = lines.map(line => {
    // For each line, split each word into an array of words
    let words = line.replace(/([^a-z0-9-,\s])/, '$1').split(' ');
    // For each line, return array of translated words
    let translatedWords = words.map(word => {
      // We need to consider hyphenated words as multiple words
      // Check if there is an hyphen and handle this special case
      if (/-/.test(word)) {
        let hyphenatedWord = word.split('-');
        return (
          hyphenatedWord
            // Handle hyphenated words
            .map(partOfHyphenatedWord => translateWord(partOfHyphenatedWord))
            // Rebuild hyphenated text string from array
            .join('-')
        );
      } else {
        // Handle non hyphenated words
        return translateWord(word);
      }
    });
    // convert array of translated lines to a string
    let translatedWordsString = translatedWords.join(' ');
    // console.log(translatedWordsString);
    return translatedWordsString;
  });
  // convert array of lines to string
  return translatedLines.join('\n');
};
