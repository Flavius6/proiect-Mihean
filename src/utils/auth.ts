import bcrypt from 'bcryptjs';
import { db, eq } from 'astro:db';
import { Users } from '../db/schema';

export async function createUser(username: string, password: string, isAdmin: boolean = false) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return db.insert(Users).values({
    username,
    password: hashedPassword,
    isAdmin,
    createdAt: new Date()
  });
}

export async function validateUser(username: string, password: string) {
  const user = await db.select().from(Users).where(eq(Users.username, username)).get();
  
  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return null;
  }

  return user;
}