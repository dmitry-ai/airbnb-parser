// 2019-04-21
/** @module nav */
const mConfig = require('./config.js');
const mScroll = require('./scroll.js');
const Nightmare = require('nightmare'); // 2020-01-10 https://github.com/segmentio/nightmare
var curPage = 0;
const maxPages = mConfig.maxPages();
const self = module.exports = {
	/**
	 * 2020-01-10
	 * @callback executeCb
	 * @param {object} r
	 */
	/**
	 * 2020-01-10
	 * @used-by main.js
	 * @param {string} url
	 * @param {executeCb} cb
	 */
	execute(url, cb) {self.page(url, [], cb);}
	/**
	 * 2020-01-10
	 * @private
	 * @used-by execute()
	 * @param {string} url
	 * @param {string[]} result
	 * @param {executeCb} cb
	 */
	,async page(url, result, cb) {
		const n = Nightmare({
			height: 1000, modal: false, openDevTools: mConfig.openDevTools(), show: mConfig.show(), width: 800
		});
		n.goto(url);
		n.wait('div[itemprop="itemListElement"]');
		n.inject('js', 'lib/jquery.js');
		// 2020-01-10
		// https://github.com/segmentio/nightmare/tree/3.0.2#evaluatefn-arg1-arg2
		// https://github.com/segmentio/nightmare/blob/3.0.2/lib/actions.js#L611-L642
		n.evaluate(() => jQuery.noConflict());
		await mScroll.execute(n);
		const flats = await n.evaluate(() =>
			// 2020-01-10 The arrow function syntax does not work inside evaluate()
			jQuery('div[itemprop=itemListElement] meta[itemprop=url]').map(function() {return(
				'https://' + jQuery(this).attr('content').split('?')[0]
					// 2019-12-20 The URL now contains «undefined» or «null» instead of «www.airbnb.com».
					.replace(/^undefined|null/, 'www.airbnb.com')
			);}).get())
		;
		const next = await n.evaluate(() => {
			var $ = jQuery;
			var $a = $('a[aria-label*=Page]',
				$('a[aria-label*=current]', $('ul[data-id=SearchResultsPagination]'))
					.closest('li').next('li')
			);
			return !$a.length ? null : `https://www.airbnb.com${$a.attr('href')}`;
		});
		await n.end();
		result = result.concat(flats);
		curPage++;
		if (!next || curPage >= maxPages) {
			cb(result);
		}
		else {
			console.log(`next: ${next}`);
			self.page(next, result, cb);
		}
	}
};