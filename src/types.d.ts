export interface Options {
	pack: string;
	mc: string;
	loader: string;
}

export type ObjectType = 'mod' | 'pack';

export type Loader = 'fabric' | 'forge' | 'quilt';

export interface MCPMObject {
	id: string;
	name: string;
	type: ObjectType;
	version_id: number;
	version: string;
	mc_versions: string[];
	loaders: Loader[];
	files?: string[];
	dependencies?: string[];
}

export interface ResolveOptions {
	from_cache: boolean;
}
