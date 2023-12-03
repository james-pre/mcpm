import { MCPMObject } from './types.js';
import { mcpm_dir } from './utils.js';
import path from 'path';

export const cache_dir = path.join(mcpm_dir, 'cache');

export interface CacheInfo {
	version: number;
	objects: MCPMObject[];
}
