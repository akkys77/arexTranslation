# AREX Translation Service
The idea of this test is to create a service that handles translations between two given
languages.
We want to start by supporting translations from English to Pig Latin.
## Pig Latin
The rules to translate from English to Pig Latin are the following:
- Words that start with a vowel (A, E, I, O, U) simply have "WAY" appended to the end
of the word;
- Words that start with a consonant have all consonant letters up to the first vowel
moved to the end of the word (as opposed to just the first consonant letter), and "AY"
is appended.
  - In this context a ‘y' in the middle of the word is counted as a vowel;
  - In this context if the word starts with 'qu’ we consider that to be a single
consonant;
- Translations should respect upper/lower case formatting;
- Hyphenated words are treated as two words;
- Words may consist of alphabetic characters only (A-Z and a-z);
- All punctuation, numerals, symbols and whitespace are not modified;
- Let's assume that there are no contractions in the English text;

Examples:
|Original|Translated
-------|-----------
|quiet|ietquay
|yellow|ellowyay
|style|ylestay
|Challenge the status quo|Allengechay ethay atusstay oquay
|Roses are red, violets are blue|Osesray areway edray, ioletsvay areway ueblay
|He is 2 years old|Ehay isway 2 earsyay oldway
|The design is state-of-the-art|Ethay esignday isway atestay-ofway-ethay-artway
|An off-campus apartment|Anway offway-ampuscay apartmentway

## Getting Started

### Prerequisites
You should have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [docker-compose installed](https://docs.docker.com/compose/install/) and configured on your machine.

### Installing

Clone the the git repo on your machine
```
git clone git@github.com:akkys77/arexTranslation.git
```

Move into the cloned repository and bring up the container
```
docker-compose up
```
The application should be running on port 8080

### Using the service
Assuming you are running the application on localhost, to use the REST api you should POST to http://localhost:8080/api/v1/translate. The request the translation of `The design is state-of-the-art` the body of the request should be format as follows:
```
  { "textToTranslate": "The design is state-of-the-art" }
```
You will receive the following response
```
  { "translatedString": "Ethay esignday isway atestay-ofway-ethay-artway" }
```
### Online Demo
A demo of the service is deployed at following url: https://arexiotest.now.sh/api/v1/translate

## Running the tests
### Unit tests
To run the sample unit tests configured with Mocha and Chai use `npm run test`. The test file is in the `/test` folder.

### Postman
You can use the Postman collections and Postman environments in the `/Postman` folder to test the api.

Information on importing Postman collections can be found here: https://www.getpostman.com/docs/v6/postman/collections/data_formats#importing-postman-data
To import the environments (local and online) you go through the Manage Environments interface of Postman

## Known issues
### Spanish style punctuation with upper cases
When using a translation string that contained both letters with upper cases and spanish style punctuation (e.g. ¡Hola!), the service returned badly capitalised result.

## Additional Information
### NPM Scripts

For development you can launch a development server using `npm run dev`
For testing you can use `npm run test`
For building you can use `npm run build`
For starting the application you can use `npm run start`

### Built with
- NodeJS v8.11.2
- Express 4
- Babel and ES6 syntax
- Docker-compose
- Deployed using on zeit using now

### Versioning
This is version v1 of the api

## Possible Road map
- Add JWT authentication
- Improve security beyond CORS implementation
- Create endpoint to create/consult/modify/delete the translation rules
- Log the translation request
- ...