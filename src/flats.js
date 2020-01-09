// 2019-04-21
/** @module flats */
const _ = require('lodash');
const mConfig = require('./config.js');
const mDB = require('./db.js');
const mDownloader = require('image-downloader');
const mFlat = require('./flat.js');
const mShell = require('shelljs');
const fBase = mConfig.imagesDir();
const self = module.exports = {
	execute(flats, cb) {
		mShell.rm('-rf', fBase);
		mDB.client().connect().then(() => {
			self.step(flats, () => {
				mDB.client().close();
				cb();
			});
		});
	}
	,step(flats, cb) {
		if (!flats.length) {
			cb();
		}
		else {
			const flat = flats.shift();
			mFlat.execute(flat, function(d) {
				const flatId = d['id'];
				console.log(`Flat: ${flatId}`);
				mDB.save(d).then(() => {
					var fFlat = fBase + '/' + flatId;
					mShell.rm('-rf', fFlat);
					mShell.mkdir('-p', fFlat);
					const images = _.mapValues(
						_.keyBy(_.map(d['photos'], p => {return _.pick(p, ['id', 'xx_large']);}), 'id'), 'xx_large'
					);
					//const owner = flat['primary_host'];
					// 2020-01-09 A photo URL looks like https://a0.muscache.com/im/pictures/<GUID>.jpg?aki_policy=xx_large
					_.each(images, (url, imageId) => {
						mDownloader
							.image({dest: fFlat + '/' + imageId + '.jpeg', url: url})
							.then(({filename}) => {console.log(filename);})
						;
					});
					self.step(flats, cb);
				});
			});
		}
	}
};