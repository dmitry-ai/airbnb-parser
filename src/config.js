// 2019-04-21
/** @module config */
const mPath = require('path');
/**
 * 2020-01-11
 * `.argv` is a getter: https://github.com/yargs/yargs/blob/v15.1.0/yargs.js#L1040-L1043
 * @type {{
 *		imagesDir: ?string
 *		,maxPages: ?number
 *		,openDevTools: ?boolean
 *		,show: boolean
 * }}
 */
const argv = require('yargs').argv;
module.exports = {
	/**
	 * 2019-05-18
	 * 2020-01-11 https://github.com/yargs/yargs/blob/v15.1.0/yargs.js#L1040-L1043
	 * @used-by flats.js
	 * @return {boolean}
	 */
	imagesDir() {return argv.imagesDir || mPath.resolve(mPath.dirname(__dirname), 'images');},
	/**
	 * 2019-05-18
	 * @used-by nav.js
	 * @return {number}
	 */
	maxPages() {return argv.maxPages || 999999;},
	/**
	 * 2019-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {boolean}
	 */
	openDevTools() {return !!argv.openDevTools;},
	/**
	 * 2019-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {boolean}
	 */
	show() {return !!(argv.openDevTools || argv.show);}
};