import mongoose from 'mongoose';
import logger from '../../logger';
const mongoDBconnection = process.env['MONGODB_CONNECTION'];

const mongoDBConnect = async () => {
  if (mongoDBconnection) {
    mongoose.connection.on('connected', () => {
      logger.info('Mongo DB connected.');

      if (process.env['NODE_ENV'] === 'dev') {
        mongoose.set('debug', true);
      }
    });
    mongoose.connection.on('error', (e) => {
      logger.error(`Mongo DB connection failed: ${e.message}`);
    });

    await mongoose.connect(mongoDBconnection);
  } else {
    throw new Error('MongoDB connection path missing.');
  }
};

export default mongoDBConnect;
