import { hash, compare } from 'bcryptjs';

export async function hashPassword(password): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(
  password,
  hashedPassword,
): Promise<boolean> {
  return await compare(password, hashedPassword);
}
