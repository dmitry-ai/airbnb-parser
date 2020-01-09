// 2019-04-21
const _ = require('lodash');
const mPath = require('path');
const yargs = require('yargs');
module.exports = {
	/**
	 * 2017-05-18
	 * @used-by flats.js
	 * @return {boolean}
	 */
	imagesDir: _.once(() => {return yargs.argv['imagesDir'] ||
		mPath.resolve(mPath.dirname(__dirname), 'images')
	;}),
	/**
	 * 2017-05-18
	 * @used-by nav.js
	 * @return {number}
	 */
	maxPages: _.once(() => {return yargs.argv['maxPages'] || 999999;}),
	/**
	 * 2017-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {boolean}
	 */
	openDevTools: _.once(() => {return !!yargs.argv['openDevTools'];}),
	/**
	 * 2017-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {boolean}
	 */
	show: _.once(() => {return yargs.argv['openDevTools'] || yargs.argv['show'];})
};