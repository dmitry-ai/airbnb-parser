// 2019-04-21 https://github.com/segmentio/nightmare/issues/625#issuecomment-217730846
/** @module scroll */
module.exports = {
	execute(n) {return this.step(n, null, 0);},
	/**
	 * 2020-01-10
	 * @used-by execute
	 * @param {Nightmare} n
	 * @param {number} prev
	 * @param {number} cur
	 */
	async step(n, prev, cur) {
		if (prev !== cur) {
			prev = cur;
			cur = await n.evaluate(() => document.body.scrollHeight);
			n.scrollTo(cur, 0);//.wait(1000);
			await this.step(n, prev, cur);
		}
	}
};