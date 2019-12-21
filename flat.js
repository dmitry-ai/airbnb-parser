// 2019-04-20
const _ = require('lodash');
const mConfig = require('./config.js');
const Nightmare = require('nightmare');
module.exports = {execute:(url, cb) => {
	const n = Nightmare({height: 1000, openDevTools: mConfig.openDevTools(), show: mConfig.show(), width: 1900});
	n.goto(url);
	// 2019-12-21 I was unable to get RequireJS working with Nightmare.
	n.inject('js', 'lib/jquery.js');
	n.inject('js', 'lib/lodash.js');
	/**
	 * 2019-12-21
	 * Previously, I had the following code here:
	 * 		n.evaluate(() => {jQuery.noConflict(); window.lodash = _.noConflict();});
	 * 		n.wait(2000);
	 * https://github.com/dmitry-ai/airbnb-parser/blob/2019-12-20/flat.js#L10
	 * I think, I do not need it anymore.
	 */
	n
		.evaluate(cb => {$(function() {
			const key = _.get(
				JSON.parse($("script[type='application/json']:contains('bootstrapData')").get(0).innerHTML)
				,'bootstrapData.layout-init.api_config.key'
			);
			const id = _.last(location.href.split('?')[0].split('/'));
			$.getJSON(`https://www.airbnb.com/api/v2/pdp_listing_details/${id}`, {
				_format: 'for_rooms_show', key: key
			}, function(d) {
				const flat = _.get(d ,'pdp_listing_detail');
				const photos = _.mapValues(
					_.keyBy(_.map(flat['photos'], p => {return _.pick(p, ['id', 'xx_large']);}), 'id')
					,'xx_large'
				);
				cb({id: flat['id'], photos: photos});
			});
		});})
		.then(v => {
			n.end().then(() => {cb(v.id, v.photos);});
		})
		.catch(e => {})
	;
}};