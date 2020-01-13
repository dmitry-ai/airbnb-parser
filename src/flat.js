// 2019-04-20
/** @module flat */
const _ = require('lodash');
const mConfig = require('./config.js');
const Nightmare = require('nightmare');
module.exports = {async execute(url) {
	const n = Nightmare({height: 1000, openDevTools: mConfig.openDevTools(), show: mConfig.show(), width: 1900});
	// 2020-01-13 https://github.com/segmentio/nightmare/tree/3.0.2#gotourl-headers
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
	 * 2020-01-13
	 * 1) "Nightmare: «Evaluation timed out after 30000msec»": https://github.com/dmitry-ai/airbnb-parser/issues/1
	 * 2) «If the Promise is rejected, the await expression throws the rejected value.»:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
	 */
	var r;
	try {
		r = await n.evaluate(cb => {$(function() {
			const key = _.get(
				JSON.parse($("script[type='application/json']:contains('bootstrapData')").get(0).innerHTML)
				,'bootstrapData.layout-init.api_config.key'
			);
			const id = _.last(location.href.split('?')[0].split('/'));
			$.getJSON(`https://www.airbnb.com/api/v2/pdp_listing_details/${id}`
				,{_format: 'for_rooms_show', key: key}
				,function(d) {cb(null, _.get(d, 'pdp_listing_detail'));}
			);
		});});
	}
	catch(e) {
		console.log(`The flat parsing is failed: ${url}\n${e}`);
		r = null;
	}
	await n.end();
	return r;
}};