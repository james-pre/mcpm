import { MCPMObject } from './types.js';

export interface Repository {
	name: string;
	getPackage(id: string): MCPMObject;
}
