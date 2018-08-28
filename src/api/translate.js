export default (req, res) => {
  // let term = req.params.term;
  // res.status(200).json({ in: 'translate', term });
  let result = processString(str);
  res.status(200).json({ result });
  console.log(result);
};

// Rule for lower case vowels
const rule01a = {
  regex: /\b([aeiou]\w*?)\b/g,
  subst: '$1way'
};
// Rule for upper case vowels
const rule01b = {
  regex: /\b([AEIOU]\w*?)\b/g,
  subst: '$1way'
};
// Rule for lower case consonants
const rule02a = {
  regex: /\b([^aeiouq\W]\w*?|qu\w*?)([aeiouy]\w*)\b/gi,
  subst: '$2$1ay'
};
// Rule for upper case consonants
const rule02b = {
  regex: /\b([^aeiouq\W]\w*?|qu\w*?)([aeiouy]\w*)\b/gi,
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
  if (pattern.test(str)) {
    return true;
  } else return false;
};

const str = `quiet
yellow
style
Challenge the status quo
Roses are ¡red!, violets¹ are blue
He is 2 years old@gmail.com
The design is state-of-the-art
An off-campus apartment ?
Disquite`;

const applySelectedRule = (rule, str) => {
  const { regex, subst } = rule;
  const result = str.replace(regex, subst);
  return result;
};

const translateWord = word => {
  
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
      // We need to consider hyphenated words as mulitple words
      // Check if there is an hyphen and handle this special case
      if (/-/.test(word)) {
        let partOfHyphenatedWord = word.split('-');
        return partOfHyphenatedWord
          .map(part => {
            if (startWithVowel(part)) {
              return applySelectedRule(rule01a, part);
            } else {
              return applySelectedRule(rule02a, part);
            }
          })
          .join('-');
      } else {
        // Handle non hyphenated words
        if (startWithVowel(word)) {
          return applySelectedRule(rule01a, word);
        } else {
          return applySelectedRule(rule02a, word);
        }
      }
    });
    // convert array of translated lines to a string
    let translatedWordsString = translatedWords.join(' ');
    // console.log(translatedWordsString);
    return translatedWordsString;
  });
  return translatedLines.join('\n');
};
