const Nightmare = require('nightmare');
const n = Nightmare({height: 1000, openDevTools: true, show: true, width: 1600});
n.goto('https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&adults=2&children=0&infants=0&toddlers=0&place_id=ChIJawhoAASnyhQR0LABvJj-zOE&query=Istanbul%2C%20Turkey&search_type=FILTER_CHANGE&room_types%5B%5D=Entire%20home%2Fapt&amenities%5B%5D=25&amenities%5B%5D=8&amenities%5B%5D=5&amenities%5B%5D=33&amenities%5B%5D=4&amenities%5B%5D=47&min_beds=1&min_bedrooms=1&min_bathrooms=1&allow_override%5B%5D=&s_tag=KgkAN0HR');
n.wait('div[itemprop="itemListElement"]');
n.inject('js', 'lib/jquery-3.4.0.js');
n
	.evaluate(() => {
		var $j = jQuery;
		$j.noConflict();
		var $items = $j('div[itemprop=itemListElement] meta[itemprop=url]');
		//debugger;
		//return 1;
		return $j('div[itemprop=itemListElement] meta[itemprop=url]').map(function() {return(
			'https://' + $j(this).attr('content').split('?')[0]
		);}).get();
	})
	.then(v => {
		debugger;
		console.log(v);
	})
	.catch(e => {
		debugger;
	})
;