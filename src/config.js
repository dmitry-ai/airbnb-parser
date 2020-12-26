// 2019-04-21
/** @module config */
const _ = require('lodash');
const mFs = require('fs-extra');
const mPath = require('path');
/**
 * 2020-01-11
 * `.argv` is a getter: https://github.com/yargs/yargs/blob/v15.1.0/yargs.js#L1040-L1043
 * @type {{
 *		imagesDir: ?string
 *		,maxPages: ?number
 *		,location: string
 *		,openDevTools: ?boolean
 *		,skipImages: ?boolean
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
	imagesDir() {return argv.imagesDir || this.pathP('images');},
	/**
	 * 2020-01-11
	 * @used-by main.js
	 * @return {string}
	 */
	location() {return argv.location},
	/**
	 * 2019-05-18
	 * @used-by nav.js
	 * @return {number}
	 */
	maxPages() {return argv.maxPages || 999999;},
	/**
	 * 2019-05-18
	 * @used-by show()
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {boolean}
	 */
	openDevTools() {return !!argv.openDevTools;},
	/**
	 * 2017-05-03
	 * @used-by pathP()
	 * @used-by private()
	 * @param {string=} s
	 * @returns {string}
	 */
	path: s => _.once(() => mPath.dirname(mPath.dirname(process.argv[1])).replace(/\\/g, '/') + '/')() + (s || ''),
	/**
	 * 2020-01-13
	 * @used-by imagesDir()
	 * @param {string=} s
	 * @returns {string}
	 */
	pathP(s) {return _.once(() => mPath.dirname(this.path()) + '/')() + s || '';},
	/**
	 * 2020-01-13
	 * @param {string} k E.g.: «db.local»
	 * @returns {string|objecy}
	 */
	private(k) {return _.get(_.once(() => JSON.parse(mFs.readFileSync(this.path('_my/private.json'), 'utf8')))(), k)},
	/**
	 * 2020-01-13
	 * @used-by flats.js
	 * @return {boolean}
	 */
	skipImages() {return !!argv.skipImages},
	/**
	 * 2019-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {boolean}
	 */
	show() {return this.openDevTools() || !!argv.show;}
};