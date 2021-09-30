import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/database-util';
import { hashPassword, verifyPassword } from '../../../lib/auth';

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user?.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid Password.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } },
  );

  client.close();
  res.status(200).json({ message: 'Password Updated.' });
}
