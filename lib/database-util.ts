import { MongoClient } from 'mongodb';

const DATABASE_NAME = 'auth-demo';

export const connectToDatabase = async () => {
  return await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.ATLAS_PASSWORD}@cluster0.r2ftk.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`,
  );
};
