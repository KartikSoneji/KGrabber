module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly",
		"$": "readonly",

		// tampermonkey functions
		"GM_getValue": "readonly",
		"GM_setValue": "readonly",
		"GM_xmlhttpRequest": "readonly",

		// direct access to window
		"unsafeWindow": "writable"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"require-atomic-updates": "off",
		"no-unused-vars": "warn",
		"no-useless-escape": "warn"
	}
}