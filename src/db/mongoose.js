const mongoose = require('mongoose');
const keys = require('../../config/keys');

mongoose.connect(keys.mongoose, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => console.log('Connected to MongoDB!!!'));

