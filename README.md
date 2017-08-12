# clean-regexp-cli
[![Build Status](https://travis-ci.org/vsimonian/clean-regexp-cli.svg?branch=master)](https://travis-ci.org/vsimonian/clean-regexp-cli)

Clean up regular expressions from the command line.

Requires Node.js 8+.

## Installation

```
$ npm install -g clean-regexp-cli
```

## Usage

```
$ crgx '[0-9]'
\d

$ crgx '/[0-9]/'
/\d/

$ crgx '[^0-9]'
\D

$ crgx '[a-zA-Z0-9_]'
\w

$ crgx '/[a-z0-9_]/i'
/\w/i

$ crgx '[^a-zA-Z0-9_]'
\W

$ crgx '/[^a-z0-9_]/i'
/\W/i

$ crgx '[a-zA-Z\d_]'
\w

$ crgx '[^a-zA-Z\d_]'
\W

$ crgx '[0-9]+\.[a-zA-Z0-9_]?' '/[0-9]+\.[a-z0-9_]?/i'
\d+\.\w?
/\d+\.\w?/i
```

## Internals

- [clean-regexp](https://github.com/SamVerschueren/clean-regexp)
- [ukaz](https://github.com/vsimonian/ukaz)

## Licence

MIT
