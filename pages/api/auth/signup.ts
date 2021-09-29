import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/database-util';
import { hashPassword } from '../../../lib/auth';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: 'Invalid Input' });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });
};

export default Handler;
