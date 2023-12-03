import { context } from 'esbuild';
import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import path from 'node:path/posix';
import packageJSON from '../package.json' assert { type: 'json' };

const { values: options } = parseArgs({
	options: {
		watch: { short: 'w', type: 'boolean', default: false },
		preserve: { short: 'p', type: 'boolean', default: false },
		out: { short: 'o', type: 'string', default: 'dist' },
	},
});

const outfile = path.join(options.out, 'cli.js');

const ctx = await context({
	entryPoints: ['src/cli.ts'],
	outfile,
	format: 'esm',
	platform: 'node',
	keepNames: true,
	sourcemap: true,
	bundle: true,
	define: {
		$package: JSON.stringify(packageJSON),
	},
	plugins: [
		{
			name: 'package',
			setup(build) {
				build.onStart(() => {
					if (!options.preserve) {
						rmSync(options.out, { force: true, recursive: true });
					}
				});
				build.onEnd(() => {
					try {
						execSync(`npx pkg -o ${options.out}/mcpm -t node18-win,node18-linux,node18-mac ${outfile}`, { stdio: 'inherit' });
					} catch (error) {
						console.error(error.toString());
					}
				});
			},
		},
	],
});

if (options.watch) {
	console.log('Watching...');
	await ctx.watch();
} else {
	await ctx.rebuild();
	await ctx.dispose();
}
