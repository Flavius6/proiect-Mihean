import type { APIRoute } from 'astro';
import { validateUser } from '../../../utils/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Missing credentials' }), {
      status: 400
    });
  }

  const user = await validateUser(username, password);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401
    });
  }

  // Set session cookie
  cookies.set('session', JSON.stringify({ userId: user.id, isAdmin: user.isAdmin }), {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200
  });
};