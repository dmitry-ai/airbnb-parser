// 2019-04-21 https://github.com/segmentio/nightmare/issues/625#issuecomment-217730846
/** @module scroll */
const self = module.exports = {
	execute:(n, cb) => {self.step(n, null, 0, cb);},
	step:(n, prev, cur, cb) => {
		if (prev === cur) {
			cb();
		}
		else {
			prev = cur;
			n.evaluate(() => document.body.scrollHeight).then((v) => {
				cur = v;
				n.scrollTo(v, 0).wait(1000);
				self.step(n, prev, cur, cb);
			});
		}
	}
};