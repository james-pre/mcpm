import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export const mcPath = path.join(process.env.APPDATA, '.minecraft');

export const mcpmPath = path.join(mcPath, '.mcpm');

export function isJSON(str: string): boolean {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}

export type JSONValue<Keys extends string = string> =
	| string
	| number
	| boolean
	| Array<JSONValue>
	| { [key in Keys]: JSONValue };

export type SchemaMap<Schema> = Map<keyof Schema | string, Schema[keyof Schema]>;

export class JSONFileMap<const Schema = Record<string, JSONValue>> implements SchemaMap<Schema> {
	get [Symbol.toStringTag](): '[JSONFileMap]' {
		return '[JSONFileMap]';
	}

	path: string;
	constructor(path: string) {
		this.path = path;

		if (!existsSync(path)) {
			writeFileSync(path, '{}');
		}
	}

	get _map(): SchemaMap<Schema> {
		const content = readFileSync(this.path, 'utf8');
		if (!isJSON(content)) {
			console.warn(`Invalid JSON file: ${this.path} (overwriting)`);
			this.clear();
			return new Map();
		}
		return new Map(Object.entries(JSON.parse(content)));
	}

	_write(map: SchemaMap<Schema>) {
		if (!existsSync(this.path)) {
			writeFileSync(this.path, '{}');
		}
		const content = JSON.stringify(Object.fromEntries(map));
		writeFileSync(this.path, content);
	}

	clear() {
		writeFileSync(this.path, '{}');
	}

	delete(key: keyof Schema & string): boolean {
		const map = this._map;
		const rt = map.delete(key);
		this._write(map);
		return rt;
	}

	get<K extends keyof Schema>(key: K | string): Schema[K] {
		return this._map.get(key) as Schema[K];
	}

	has(key: keyof Schema | string): boolean {
		return this._map.has(key.toString());
	}

	set(key: keyof Schema | string, value: Schema[keyof Schema] & JSONValue): this {
		const map = this._map;
		map.set(key, value);
		this._write(map);
		return this;
	}

	get size() {
		return this._map.size;
	}

	get [Symbol.iterator]() {
		const map = this._map;
		return map[Symbol.iterator].bind(map);
	}

	get keys() {
		const map = this._map;
		return map.keys.bind(map);
	}

	get values() {
		const map = this._map;
		return map.values.bind(map);
	}

	get entries() {
		const map = this._map;
		return map.entries.bind(map);
	}

	get forEach() {
		const map = this._map;
		return map.forEach.bind(map);
	}
}
