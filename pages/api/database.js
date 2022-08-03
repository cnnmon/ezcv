import mongoose from 'mongoose';
import nextConnect from 'next-connect';

const MONGODB_URI = process.env.MONGO_URI;

async function connectionIsUp(): Promise<boolean> {
    try {
        return await connection.db.admin().ping().then(res => !!res?.ok === 1)
    } catch (err) {
        return false
    }
}

async function database(req, res, next) {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
  console.log('Database state is ' + mongoose.connection.readyState);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
