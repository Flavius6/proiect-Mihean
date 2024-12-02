import { db } from 'astro:db';
import { Users } from '../db/schema';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await db.insert(Users).values({
      username: 'admin',
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date()
    });
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();