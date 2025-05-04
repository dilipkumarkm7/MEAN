const mongoose = require('mongoose');

const mongo = mongoose.connect(
     process.env.MONGODB_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
     console.log('Connected Sucessfully');
}).catch((err) => {
     console.log('MongoDB Connection Error!', err);
})

module.exports = mongo;