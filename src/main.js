// 2019-04-19
// 2019-05-18
// An usage example:
// node main \
//	--imagesDir=C:/work/clients/nightmare/images-2020-01-09 \
//	--location="Bangkok, Thailand" \
//	--maxPages=1
const _ = require('lodash');
const mFlats = require('./flats.js');
const mNav = require('./nav.js');
const mPath = require('path');
const mShell = require('shelljs');
const mJP = require('jquery-param');
const fixedParams = {
	adults: 2
	,amenities: [
		4 // 2019-12-20 Wi-Fi
		,5  // 2019-12-20 Air conditioner
		,8  // 2019-12-20 Kitchen
		,25 // 2019-12-20 Hot tub
		,33 // 2019-12-20 Washer
		,46 // 2019-12-20 Iron
		,47 // 2019-12-20 Laptop friendly workspace
		,78 // 2019-12-20 Private bathroom
	]
	,map_toggle: false
	,min_bathrooms: 1
	,min_bedrooms: 1
	,min_beds: 1
	,property_type_id: [1]
	,refinement_paths: ['/homes']
	,room_types: ['Entire home/apt']
	,search_type: 'PAGINATION'
	,toddlers: 0
};
const url = `https://www.airbnb.com/s/homes?${mJP(_.assign(fixedParams, {query: require('yargs').argv['location']}))}`;
mNav.execute(url, flats => {
	console.log(`Flats: ${flats.length}`);
	const fBase = mPath.resolve(mPath.dirname(__dirname), 'images');
	mShell.rm('-rf', fBase);
	mFlats.execute(flats, () => {
		console.log('done');
	});
});