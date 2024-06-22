#!/usr/bin/env node

import { program } from 'commander';
import packageJson from '../package.json';
import { startCommand } from './commands/start';
import { statusCommand } from './commands/status';
import { resetCommand } from './commands/reset';
import { goodBadCommand } from './commands/goodBad';

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command('status')
  .description('Show the current state of the bisection')
  .action(statusCommand);

program
  .command('start')
  .option(
    '--no-filter-versions',
    'Do not filter versions. By default, only versions matching the format x.y.z[.w] are included in the bisection.'
  )
  .argument('<package>', 'The package to bisect')
  .description('Start bisecting a package')
  .action(startCommand);

program
  .command('good')
  .argument('[version]', 'The version to mark as good')
  .description(
    'Mark a version as good. If no version is specified, uses the currently installed version.'
  )
  .action(goodBadCommand('goodVersion'));

program
  .command('bad')
  .argument('[version]', 'The version to mark as bad')
  .description(
    'Mark a version as bad. If no version is specified, uses the currently installed version.'
  )
  .action(goodBadCommand('badVersion'));

program
  .command('reset')
  .option(
    '--no-install',
    'Do not reinstall the version that was used prior to bisecting.'
  )
  .description('Reset the bisection')
  .action(resetCommand);

program.parse();
