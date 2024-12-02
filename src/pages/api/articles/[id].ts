import type { APIRoute } from 'astro';
import { db, eq } from 'astro:db';
import slugify from 'slugify';

export const PUT: APIRoute = async ({ request, params, locals }) => {
  if (!locals.user?.isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const id = parseInt(params.id!, 10);
  const data = await request.formData();
  const title = data.get('title')?.toString();
  const content = data.get('content')?.toString();

  if (!title || !content) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const article = await db.update('Articles')
      .set({
        title,
        content,
        slug,
        updatedAt: new Date()
      })
      .where(eq('Articles.id', id))
      .returning()
      .get();

    return new Response(JSON.stringify({ success: true, article }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update article' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  if (!locals.user?.isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const id = parseInt(params.id!, 10);

  try {
    await db.delete('Articles').where(eq('Articles.id', id));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete article' }), { status: 500 });
  }
};