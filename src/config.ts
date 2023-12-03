import path from 'path';
import { JSONFileMap, mcpmPath } from './utils.js';

export const configPath = path.join(mcpmPath, 'config.json');

interface Config {
	repositories: {
		id: string;
		url: string;
	}[];
}

export let config: JSONFileMap<Config>;
try {
	config = new JSONFileMap<Config>(configPath);
} catch (e) {
	console.error(e.toString());
	process.exit();
}
