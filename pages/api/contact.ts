import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const DATABASE_NAME = 'my-site';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };
    let client;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://${process.env.mongodb_username}:${process.env.ATLAS_PASSWORD}@cluster0.r2ftk.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`,
      );
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage); // insert된 객체에도 _id 프로퍼티가 붙어버림.
    } catch (e) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }
    client.close();

    res.status(201).json({
      message: 'Successfully stored message!',
      result: newMessage,
    });
  }
}

export default handler;
