// 2019-04-21
/** @module nav */
const mConfig = require('./config.js');
const mScroll = require('./scroll.js');
const Nightmare = require('nightmare'); // 2020-01-10 https://github.com/segmentio/nightmare
module.exports = {
	/**
	 * 2020-01-10
	 * @see module:main
	 * @param {string} url
	 * @return {string[]}
	 */
	async execute(url) {
		const maxPages = mConfig.maxPages();
		var curPage = 1, items, r = [];
		while (url && curPage <= maxPages) {
			console.log(`Page ${curPage}: ${url}`);
			([items, url] = await this.page(url));
			r = r.concat(items);
			curPage++;
		}
		return r;
	}

	/**
	 * 2020-01-10
	 * @private
	 * @see #execute
	 * @param {string} url
	 */
	,async page(url) {
		const n = Nightmare({height: 1000, modal: false, openDevTools: mConfig.openDevTools(), show: mConfig.show(), width: 800});
		n.goto(url);
		n.wait('div[itemprop="itemListElement"]');
		n.inject('js', 'lib/jquery.js');
		/**
		 * 2020-01-10
		 * https://github.com/segmentio/nightmare/tree/3.0.2#evaluatefn-arg1-arg2
		 * https://github.com/segmentio/nightmare/blob/3.0.2/lib/actions.js#L611-L642
		 * 2020-01-11
		 * Previously, I had the following code here:
		 * 		n.evaluate(() => jQuery.noConflict());
		 * I think, I do not need it anymore.
		 */
		await mScroll.execute(n);
		const r = await n.evaluate(() => {
			var $a = $('a[aria-label*=Page]',
				$('a[aria-label*=current]', $('ul[data-id=SearchResultsPagination]'))
					.closest('li').next('li')
			);
			return [
				// 2020-01-10 The arrow function syntax does not work inside evaluate()
				$('div[itemprop=itemListElement] meta[itemprop=url]').map(function() {return(
					'https://' + $(this).attr('content').split('?')[0]
						// 2019-12-20 The URL now contains «undefined» or «null» instead of «www.airbnb.com».
						.replace(/^undefined|null/, 'www.airbnb.com')
				);}).get()
			,!$a.length ? false : `https://www.airbnb.com${$a.attr('href')}`
		]});
		await n.end();
		return r;
	}
};