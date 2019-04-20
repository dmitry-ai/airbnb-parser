// 2019-04-19
const _ = require('lodash');
const mFlat = require('./flat.js');
const Nightmare = require('nightmare');
const vo = require('vo');
const n = Nightmare({height: 1000, openDevTools: true, show: true, width: 1900});
var run = function * () {
	n.goto('https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&adults=2&children=0&infants=0&toddlers=0&place_id=ChIJawhoAASnyhQR0LABvJj-zOE&query=Istanbul%2C%20Turkey&room_types%5B%5D=Entire%20home%2Fapt&amenities%5B%5D=25&amenities%5B%5D=8&amenities%5B%5D=5&amenities%5B%5D=33&amenities%5B%5D=4&amenities%5B%5D=47&min_beds=1&min_bedrooms=1&min_bathrooms=1&map_toggle=false');
	n.wait('div[itemprop="itemListElement"]');
	n.inject('js', 'lib/jquery-3.4.0.js');
	n.evaluate(() => jQuery.noConflict());
	n.wait(2000);
	// 2019-04-20 https://github.com/segmentio/nightmare/issues/625#issuecomment-217730846
	var previousHeight = null;
	var currentHeight = 0;
	while (previousHeight !== currentHeight) {
		previousHeight = currentHeight;
		var currentHeight = yield n.evaluate(function() {return document.body.scrollHeight;});
		yield n.scrollTo(currentHeight, 0).wait(1000);
	}
	//yield n.end();
};
vo(run)(function(err) {
	n
		.evaluate(() => {return jQuery('div[itemprop=itemListElement] meta[itemprop=url]').map(function() {return(
			'https://' + jQuery(this).attr('content').split('?')[0]
		);}).get();})
		.then(flats => {
			n.end().then(() => {
				_.each(flats.slice(0, 1), (flatURL) => {
					mFlat.execute(flatURL, function(r) {
						console.log(flatURL);
						console.log(r);
					})
				});
		 	});
		})
		.catch(e => {
			console.log(e);
		})
	;
});