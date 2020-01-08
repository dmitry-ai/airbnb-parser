// 2019-01-08
// 1) http://mongodb.github.io/node-mongodb-native/3.4
// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
// 2) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
// 3) @TODO https://mongoosejs.com
const {MongoClient: mMongo} = require('mongodb');
const assert = require('assert');
// 2020-01-08
// "How to fix «current Server Discovery and Monitoring engine is deprecated» on a MongoDB connection
// using the `mongodb` Node.js package?": https://df.tips/t/973
const client = new mMongo('mongodb://localhost:27017', {useUnifiedTopology: true});
client.connect(function(e) {
	assert.equal(null, e);
	const db = client.db('airbnb');
	client.close();
});