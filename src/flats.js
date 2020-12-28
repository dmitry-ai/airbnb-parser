// 2019-04-21
/** @module flats */
const _ = require('lodash');
const mConfig = require('./config.js');
const mDB = require('./db.js');
const mDownloadImages = require('./downloadImages.js');
const mFlat = require('./flat.js');
const mShell = require('shelljs');
module.exports = {
	/**
	 * @name module:flats#execute
	 * @see module:main
	 * @param flats
	 * @returns {Promise<void>}
	 */
	async execute(flats) {
		mShell.rm('-rf', mConfig.imagesDir());
		await mDB.client().connect();
		try {
			// 2020-01-11 https://stackoverflow.com/a/37576787
			for (const flat of flats) {
				const d = await mFlat.execute(flat);
				if (d) {
					console.log(`Flat: ${d['id']}`);
					if (!mConfig.skipImages()) {
						mDownloadImages.execute(d);
					}
					await mDB.save(d);
				}
			}
		}
		finally {mDB.client().close();}
	}
};