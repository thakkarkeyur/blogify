const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URL, {
            //useCreateIndex: true,
            //useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
};

module.exports = dbConnect;