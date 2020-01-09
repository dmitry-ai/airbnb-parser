// 2019-04-21
const _ = require('lodash');
const mPath = require('path');
const yargs = require('yargs');
module.exports = {
	/**
	 * 2017-05-18
	 * @used-by flats.js
	 * @return {Boolean}
	 */
	imagesDir: _.once(() => {return yargs.argv['imagesDir'] ||
		mPath.resolve(mPath.dirname(__dirname), 'images')
	;}),
	/**
	 * 2017-05-18
	 * @used-by nav.js
	 * @return {Number}
	 */
	maxPages: _.once(() => {return yargs.argv['maxPages'] || 999999;}),
	/**
	 * 2017-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {Boolean}
	 */
	openDevTools: _.once(() => {return !!yargs.argv['openDevTools'];}),
	/**
	 * 2017-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @return {Boolean}
	 */
	show: _.once(() => {return yargs.argv['openDevTools'] || yargs.argv['show'];})
};