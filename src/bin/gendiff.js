#!/usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(
    genDiff(firstConfig, secondConfig, commander.format),
  ));

commander.parse(process.argv);
