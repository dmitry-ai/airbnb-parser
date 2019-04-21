// 2019-04-19
const _ = require('lodash');
const mFlats = require('./flats.js');
const mNav = require('./nav.js');
const mPath = require('path');
const mShell = require('shelljs');
const initialURL = 'https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&adults=2&children=0&infants=0&toddlers=0&place_id=ChIJawhoAASnyhQR0LABvJj-zOE&query=Istanbul%2C%20Turkey&room_types%5B%5D=Entire%20home%2Fapt&amenities%5B%5D=25&amenities%5B%5D=8&amenities%5B%5D=5&amenities%5B%5D=33&amenities%5B%5D=4&amenities%5B%5D=47&min_beds=1&min_bedrooms=1&min_bathrooms=1&map_toggle=false&search_type=PAGINATION';
mNav.execute(initialURL, (flats) => {
	console.log('Flats: ' + flats.length);
	const fBase = mPath.resolve(mPath.dirname(__dirname), 'images');
	mShell.rm('-rf', fBase);
	mFlats.execute(flats, () => {
		console.log('done');
	});
});