// 2019-04-21 https://github.com/segmentio/nightmare/issues/625#issuecomment-217730846
/** @module scroll */
module.exports = {
	/**
	 * 2019-04-21
	 * @see module:nav#page
	 * @param {Nightmare} n
	 * @returns {Promise<void>}
	 */
	execute(n) {return this.step(n, null, 0);},
	/**
	 * 2020-01-10
	 * @see #execute
	 * @param {Nightmare} n
	 * @param {number} prev
	 * @param {number} cur
	 */
	async step(n, prev, cur) {
		if (prev !== cur) {
			prev = cur;
			cur = await n.evaluate(() => document.body.scrollHeight);
			n.scrollTo(cur, 0).wait(1000);
			await this.step(n, prev, cur);
		}
	}
};