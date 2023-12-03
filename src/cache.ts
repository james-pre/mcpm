import { MCPMObject } from './types.js';
import { mcpmPath } from './utils.js';
import path from 'path';

export const cache_dir = path.join(mcpmPath, 'cache');

export interface CacheInfo {
	version: number;
	objects: MCPMObject[];
}
