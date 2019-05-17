// 2019-04-20
const _ = require('lodash');
const mConfig = require('./config.js');
const Nightmare = require('nightmare');
module.exports = {execute:(url, cb) => {
	const n = Nightmare({height: 1000, openDevTools: mConfig.openDevTools(), show: mConfig.show(), width: 1900});
	n.goto(url);
	n.inject('js', 'lib/jquery-3.4.0.js');
	n.inject('js', 'lib/lodash-4.17.11.js');
	n.evaluate(() => {jQuery.noConflict(); window.lodash = _.noConflict();});
	n.wait(2000);
	n
		.evaluate(() => {
			var $j = jQuery;
			var _ = window.lodash;
			var listing = _.get(
				JSON.parse(
					_.trimEnd(
						_.trimStart(
							$j("script[type='application/json']:contains('bootstrapData')").get(0).innerHTML
							,'<!--'
						)
						,'-->'
					)
				)
				,'bootstrapData.reduxData.homePDP.listingInfo.listing'
			);
			var photos =
				_.mapValues(
					_.keyBy(
						_.map(listing['photos'], (photo) => {return _.pick(photo, ['id', 'xx_large']);})
						,'id'
					)
				,'xx_large'
			);
			return {id: listing['id'], photos: photos};
		})
		.then(v => {
			n.end().then(() => {cb(v.id, v.photos);});
		})
		.catch(e => {})
	;
}};