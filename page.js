// 2019-04-21
const mScroll = require('./scroll.js');
const Nightmare = require('nightmare');
const n = Nightmare({height: 1000, modal: false, openDevTools: true, show: true, width: 800});
module.exports = {execute:(url, cb) => {
	n.goto(url);
	n.wait('div[itemprop="itemListElement"]');
	n.inject('js', 'lib/jquery-3.4.0.js');
	n.evaluate(() => {jQuery.noConflict();});
	mScroll.execute(n, () => {
		n
			.evaluate(() => {
				return jQuery('div[itemprop=itemListElement] meta[itemprop=url]').map(function() {return(
					'https://' + jQuery(this).attr('content').split('?')[0]
				);}).get();
			})
			.then(flats => {
				console.log('flats: ' + flats.length);
				n.evaluate(() => {
					var $ = jQuery;
					var $a = $('a[aria-label*=current]', $('ul[data-id=SearchResultsPagination]'));
					return !$a.length ? null : 'https://www.airbnb.com' + $a.attr('href');
				}).then(next => {
					console.log('next: ' + next);
					n.end().then(() => {
						cb(flats, next);
					});
				});
				/*n.end().then(() => {
					_.each(flats.slice(0, 1), (flatURL) => {
						mFlat.execute(flatURL, function(r) {
							console.log(flatURL);
							console.log(r);
						})
					});
				});*/
			})
			.catch(e => {
				console.log(e);
			})
		;
	});
}};