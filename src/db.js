// 2020-01-09
/** @module db */
const _ = require('lodash');
const {MongoClient: mMongo} = require('mongodb');
module.exports = {
	// 2020-01-08
	// "How to fix «current Server Discovery and Monitoring engine is deprecated» on a MongoDB connection
	// using the `mongodb` Node.js package?": https://df.tips/t/973
	client: _.once(() => new mMongo('mongodb://localhost:27017', {useUnifiedTopology: true})),
	/**
	 * 2020-01-13
	 * @param {object} d
	 * @returns {Promise}
	 */
	save(d) {
		const db = this.client().db('airbnb');
		/**
		 * 2020-01-09
		 * 1) https://github.com/mongodb/node-mongodb-native/blob/v3.4.1/lib/db.js#L387-L479
		 * http://mongodb.github.io/node-mongodb-native/3.4/api/Db.html#collection
		 * «Fetch a specific collection (containing the actual collection information)».
		 * 2) «What is MongoDBs strict mode and is it a good idea to use?» https://stackoverflow.com/a/21595828
		 * 3) Collection::find():
		 * «Creates a cursor for a query that can be used to iterate over results from MongoDB».
		 * http://mongodb.github.io/node-mongodb-native/3.4/api/Collection.html#find
		 * 3.1) See also: https://docs.mongodb.com/v4.2/reference/method/db.collection.find
		 * 4) Cursor::toArray():
		 * «Returns an array of documents.
		 * The caller is responsible for making sure that there is enough memory to store the results.
		 * Note that the array only contains partial results when this cursor had been previously accessed.
		 * In that case, cursor.rewind() can be used to reset the cursor.»
		 * http://mongodb.github.io/node-mongodb-native/3.4/api/Cursor.html#toArray
		 */
		const cFlat = db.collection('flat');
		// 2020-01-10 https://stackoverflow.com/a/38883596
		return cFlat.updateOne({_id : d.id}, {$set: d}, {upsert: true});
	}
};