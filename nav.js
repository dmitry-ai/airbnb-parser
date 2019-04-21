// 2019-04-21
const mConfig = require('./config.js');
const mScroll = require('./scroll.js');
const Nightmare = require('nightmare');
var curPage = 0;
const maxPages = 100;
const self = module.exports = {
	execute:(url, cb) => {self.page(url, [], cb);}
	,page:(url, result, cb) => {
		const n = Nightmare({height: 1000, modal: false, /*openDevTools: true,*/ show: mConfig.show, width: 800});
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
					//console.log('flats: ' + flats.length);
					n.evaluate(() => {
						var $ = jQuery;
						var r = null;
						var $a = $('a[aria-label*=Page]',
							$('a[aria-label*=current]', $('ul[data-id=SearchResultsPagination]'))
								.closest('li').next('li')
						);
						return (!$a.length ? null : 'https://www.airbnb.com' + $a.attr('href'));
					}).then(next => {
						n.end().then(() => {
							result = result.concat(flats);
							curPage++;
							if (!next || curPage >= maxPages) {
								cb(result);
							}
							else {
								console.log('next: ' + next);
								self.page(next, result, cb);
							}
						});
					});
				})
				.catch(e => {
					console.log(e);
				})
			;
		});
	}
};