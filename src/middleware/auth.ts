import type { MiddlewareResponseHandler } from 'astro';
import { db, eq } from 'astro:db';
import { Users } from '../db/schema';

export const onRequest: MiddlewareResponseHandler = async ({ cookies, locals }, next) => {
  const sessionCookie = cookies.get('session');
  
  if (sessionCookie?.value) {
    try {
      const session = JSON.parse(sessionCookie.value);
      const user = await db.select().from(Users).where(eq(Users.id, session.userId)).get();
      
      if (user) {
        locals.user = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        };
      }
    } catch (e) {
      cookies.delete('session', { path: '/' });
    }
  }
  
  return next();
};