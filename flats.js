// 2019-04-21
const _ = require('lodash');
const mDownloader = require('image-downloader');
const mFlat = require('./flat.js');
const mPath = require('path');
const mShell = require('shelljs');
const fBase = mPath.resolve(mPath.dirname(__dirname), 'images');
const self = module.exports = {
	execute:(flats, cb) => {
		mShell.rm('-rf', fBase);
		self.step(flats, cb);
	}
	,step:(flats, cb) => {
		if (!flats.length) {
			cb();
		}
		else {
			const flat = flats.shift();
			mFlat.execute(flat, function(flatId, images) {
				console.log('Flat: ' + flatId);
				var fFlat = fBase + '/' + flatId;
				mShell.rm('-rf', fFlat);
				mShell.mkdir('-p', fFlat);
				_.each(images, (url, imageId) => {
					mDownloader
						.image({dest: fFlat + '/' + imageId + '.jpeg', url: url})
						.then(({filename}) => {console.log(filename);})
					;
				});
				self.step(flats, cb);
			});
		}
	}
};