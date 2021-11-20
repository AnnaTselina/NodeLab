import mongoose from 'mongoose';
const mongoDBconnection = process.env['MONGODB_CONNECTION'];

const mongoDBConnect = async () => {
  if (mongoDBconnection) {
    await mongoose.connect(mongoDBconnection).then(
      () => {
        if (process.env['NODE_ENV'] === 'dev') {
          mongoose.set('debug', true);
        }
        console.log('Mongo db connected');
      },
      (e) => {
        console.log(e);
      }
    );
  } else {
    throw new Error('MongoDB connection path missing.');
  }
};

export default mongoDBConnect;
