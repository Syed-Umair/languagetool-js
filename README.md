# languagetool-js

[![npm version](https://badge.fury.io/js/languagetool-js.svg)](https://www.npmjs.com/package/languagetool-js)

This is a Node.js binding to the [LanguageTool](https://languagetool.org/) (LT)
spellchecker. It is based on a local instance of LT.
As it is a Java based framework, this binding will use
[node-jre](https://github.com/schreiben/node-jre/), which provides an embedded
local Java Runtime Engine.

## Install

```bash
npm install --save languagetool-js
```

## Usage

The following code

```javascript
var lt = require('languagetool-js');

lt.check(
  'This is wong. Tolt you so.',
  'en-US'
).then(res => console.log(JSON.stringify(res, null, 4)));
```

should print something like this:

```JSON
{
    "code": 200,
    "matches": [
        {
            "offset": 8,
            "length": 4,
            "message": "Possible spelling mistake found",
            "shortMessage": "Spelling mistake",
            "replacements": [
                "Wong",
                "long",
                "won",
                "wing",
                "song",
                "Kong",
                "Long",
                "wrong",
                "Wang",
                "Cong",
                "Yong",
                "gong",
                "pong",
                "bong",
                "tong",
                "wont",
                "wonk",
                "dong",
                "wog",
                "won g"
            ],
            "ruleId": "MORFOLOGIK_RULE_EN_US",
            "ruleDescription": "Possible spelling mistake",
            "ruleIssueType": "misspelling",
            "ruleCategoryId": "TYPOS",
            "ruleCategoryName": "Possible Typo"
        },
        {
            "offset": 14,
            "length": 4,
            "message": "Possible spelling mistake found",
            "shortMessage": "Spelling mistake",
            "replacements": [
                "Told",
                "Toll",
                "Bolt",
                "Colt",
                "Holt",
                "Tilt",
                "Tort",
                "Volt",
                "Molt",
                "Tot",
                "Tout",
                "Jolt",
                "Toot",
                "Dolt",
                "Tole"
            ],
            "ruleId": "MORFOLOGIK_RULE_EN_US",
            "ruleDescription": "Possible spelling mistake",
            "ruleIssueType": "misspelling",
            "ruleCategoryId": "TYPOS",
            "ruleCategoryName": "Possible Typo"
        }
    ]
}
```

To get all supported languages you can call the following:

```javascript
lt.languages().then(res => {
    res.languages.forEach(
      l => console.log('Language: ' + l.name + ' Locale: ' + l.locale)
    ); // Should print a list of language-locale pairs
});
```

## API

`lt.install()` Downloads and prepares LanguageTool.
It is automatically called during module installation.
- Returns a `Promise` object.

`lt.check(text, locale)` Spellchecks the provided text.
- `text` (string). The text to be spellchecked.
- `locale` (string). The locale code. Use `lt.languages()` to get a list of supported languages and their locale codes.
- Returns a `Promise` object. It will resolve to an object of the following form:
```javascript
{
    "code": 200, // indicates a successful request
    "languages": [ // every entry of this array represents a supported language
        {
            "name": 8, // offset within the provided text
            "length": 4, // length of the misspelled text fragment
            "message": "Possible spelling mistake found", // long description
            "shortMessage": "Spelling mistake", // short description
            "replacements": [ // replacement options
                "Wong", // [...]
                "won g"
            ],
            "ruleId": "MORFOLOGIK_RULE_EN_US", // key of the underlying rule
            "ruleDescription": "Possible spelling mistake", // description of the rule
            "ruleIssueType": "misspelling", // issue type of the rule
            "ruleCategoryId": "TYPOS", // ID of the category this rule belongs to
            "ruleCategoryName": "Possible Typo" // description of the category this rule belongs to
        } // ,[...]
    ]
}
```

`lt.languages()` Retrieve all supported languages.
- Returns a `Promise` object. It will resolve to an object of the following form:
```javascript
{
    "code": 200, // indicates a successful request
    "matches": [ // every entry of this array represents some misspelling
        {
            "name": "English (US)", // full name of the language (and variant)
            "locale": "en_US" // locale code of the language variant
        } // ,[...]
    ]
}
```
