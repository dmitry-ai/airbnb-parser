// 2019-04-21
/** @module flats */
const _ = require('lodash');
const mConfig = require('./config.js');
const mDB = require('./db.js');
const mDownloadImages = require('./downloadImages.js');
const mFlat = require('./flat.js');
const mShell = require('shelljs');
module.exports = {
	async execute(flats) {
		mShell.rm('-rf', mConfig.imagesDir());
		// 2020-01-11 https://stackoverflow.com/a/37576787
		for (const flat of flats) {
			const d = await mFlat.execute(flat);
			console.log(`Flat: ${d['id']}`);
			mDownloadImages.execute(d);
			//mDB.save(d);
		}
	}
};