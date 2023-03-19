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
    console.log({ email, username, password });
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      console.log('existing user');
      return res.status(422).json({ error: 'Email taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('lol');

    const savedUser = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
        image: '',
        emailVerifed: new Date(),
      },
    });

    return res.status(200).send(savedUser);
  } catch (error) {
    console.log({ error });
    return res.status(400).end();
  }
}
