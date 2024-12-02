import type { APIRoute } from 'astro';
import { db } from 'astro:db';
import slugify from 'slugify';

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.user?.isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const data = await request.formData();
  const title = data.get('title')?.toString();
  const content = data.get('content')?.toString();

  if (!title || !content) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const article = await db.insert('Articles').values({
      title,
      content,
      slug,
      authorId: locals.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning().get();

    return new Response(JSON.stringify({ success: true, article }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create article' }), { status: 500 });
  }
};