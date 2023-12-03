import { Command } from 'commander';

const { version, description } = $package;

const program = new Command();

program
	.name('mcpm')
	.description(description)
	.version(version)
	.option('-m, --mc', 'Which Minecraft version to use')
	.option('-p, --pack <name>', 'Which modpack to use')
	.option('-l, --loader <loader>', 'Which mod loader to use');

import use from './commands/use.js';
program.command('use').description('Use/load a Minecraft version, mod, or modpack').argument('[mod]', 'MC mod').action(use);

import install from './commands/install.js';
program.command('install').description('Install a Minecraft mod or modpack').argument('<mod>', 'mod or modpack').action(install);

program.parse();
