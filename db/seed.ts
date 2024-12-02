import { db } from '@astrojs/db/server';
import { Users } from '../src/db/schema';
import bcrypt from 'bcryptjs';

export default async function seed() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await db.insert(Users).values({
    username: 'admin',
    password: hashedPassword,
    isAdmin: true,
    createdAt: new Date()
  });
} 