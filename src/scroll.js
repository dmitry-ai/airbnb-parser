// 2019-04-21 https://github.com/segmentio/nightmare/issues/625#issuecomment-217730846
/** @module scroll */
module.exports = {
	execute(n, cb) {this.step(n, null, 0, cb);},
	async step(n, prev, cur, cb) {
		if (prev === cur) {
			cb();
		}
		else {
			prev = cur;
			cur = await n.evaluate(() => document.body.scrollHeight);
			n.scrollTo(cur, 0).wait(1000);
			this.step(n, prev, cur, cb);
		}
	}
};