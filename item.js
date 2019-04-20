const _ = require('lodash');
const Nightmare = require('nightmare');
const n = Nightmare({height: 1000, openDevTools: true, show: true, width: 1900});
n.goto('https://www.airbnb.com/rooms/3443462');
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
		var r = {};
		r[listing['id']] = photos;
		return r;
	})
	.then(v => {
		console.log(v);
	})
	.catch(e => {})
;