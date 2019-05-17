// 2019-04-21
const _ = require('lodash');
const mPath = require('path');
const yargs = require('yargs');
module.exports = {
	/**
	 * 2017-05-18
	 * @used-by flats.js
	 * @returns {Boolean}
	 */
	imagesDir: _.once(() => {return yargs.argv['imagesDir'] ||
		mPath.resolve(mPath.dirname(__dirname), 'images')
	;}),
	/**
	 * 2017-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @returns {Boolean}
	 */
	openDevTools: _.once(() => {return !!yargs.argv['openDevTools'];}),
	/**
	 * 2017-05-18
	 * @used-by flat.js
	 * @used-by nav.js
	 * @returns {Boolean}
	 */
	show: _.once(() => {return !!yargs.argv['show'];})
};