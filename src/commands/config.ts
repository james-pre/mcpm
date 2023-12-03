import { config } from '../config.js';

export default function (key: string, value?) {
	try {
		if (value === undefined) {
			console.log(config.has(key) ? JSON.stringify(config.get(key)) : '[undefined]');
			return;
		}

		config.set(key, value);
	} catch (e) {
		console.error(e.toString());
	}
}
