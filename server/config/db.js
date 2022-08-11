const mongoose = require('mongoose');

const connectDB = () => {
  const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );

  mongoose
    .connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful!'));
};

module.exports = connectDB;
