# Gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Build Status](https://travis-ci.org/sergey20x25/project-lvl2-s451.svg?branch=master)](https://travis-ci.org/sergey20x25/project-lvl2-s451)
## Description
Compares two configuration files and shows a difference.
## Installation
npm package:
```sh
$ npm install -g sergey20x25-gd
```
[![asciicast](https://asciinema.org/a/236415.svg)](https://asciinema.org/a/236415)
## Launch
To start type in the console:
```sh
$ gendiff <path_to_file_1> <path_to_file_2> [options]
```

```
Options:
  -V, --version        output the version number
  -f, --format [type]  output format, tree, plain or json (default: "tree")
  -h, --help           output usage information
```

json example:
[![asciicast](https://asciinema.org/a/236414.svg)](https://asciinema.org/a/236414)
yaml example:
[![asciicast](https://asciinema.org/a/236672.svg)](https://asciinema.org/a/236672)
ini example:
[![asciicast](https://asciinema.org/a/236687.svg)](https://asciinema.org/a/236687)
recursive json example:
[![asciicast](https://asciinema.org/a/237290.svg)](https://asciinema.org/a/237290)
plain out example:
[![asciicast](https://asciinema.org/a/237397.svg)](https://asciinema.org/a/237397)
json out example:
[![asciicast](https://asciinema.org/a/237748.svg)](https://asciinema.org/a/237748)

## API
```
var genDiff = require('sergey20x25-gd');

genDiff(pathToFile1, PathToFile2[, format]);
```
format:
* 'tree'
* 'plain'
* 'json'
## Help
For help type **gendiff -h** in the console:
```sh
$ gendiff -h
```
[![asciicast](https://asciinema.org/a/236310.svg)](https://asciinema.org/a/236310)