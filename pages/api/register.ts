import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, username, password } = req.body;
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const savedUser = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return res.status(200).send(savedUser);
  } catch (error) {
    console.log({ error });
    return res.status(400).end();
  }
}
