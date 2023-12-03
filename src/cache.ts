import { MCPMObject } from './types.js';
import { mcpmPath } from './utils.js';
import path from 'path';

export const cachePath = path.join(mcpmPath, 'cache');

export interface CacheInfo {
	version: number;
	objects: MCPMObject[];
}
