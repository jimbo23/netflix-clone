import { PrismaClient } from '@prisma/client';

// this is to prevent NextJS from creating bunch of prisma clients
// during development mode :)
// global file is not affected by hot reload.
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;
