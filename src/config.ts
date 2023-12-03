import path from 'path/posix';
import { JSONFileMap, mcpmPath } from './utils.js';

export const configPath = path.join(mcpmPath, 'config.json');

interface Config {
	repositories: {
		id: string;
		url: string;
	}[];
}

export const config = new JSONFileMap<Config>(configPath);
