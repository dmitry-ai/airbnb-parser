// 2020-01-11
/** @module downloadImages */
const _ = require('lodash');
const mConfig = require('./config.js');
const mDownloader = require('image-downloader'); // 2020-01-11 https://gitlab.com/demsking/image-downloader
const mShell = require('shelljs');
module.exports = {
	execute(d) {
		const fFlat = `${mConfig.imagesDir()}/${d['id']}`;
		mShell.mkdir('-p', fFlat);
		const images = _.mapValues(
			_.keyBy(_.map(d['photos'], p => {return _.pick(p, ['id', 'xx_large']);}), 'id'), 'xx_large'
		);
		// 2020-01-09 A photo URL looks like https://a0.muscache.com/im/pictures/<GUID>.jpg?aki_policy=xx_large
		_.each(images, (url, id) => {
			mDownloader
				.image({dest: `${fFlat}/${id}.jpeg`, url})
				.then(({filename: f}) => {console.log(f);})
			;
		});
	}
};