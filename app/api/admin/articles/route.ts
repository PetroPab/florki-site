import { NextRequest, NextResponse } from 'next/server';
import matter from 'gray-matter';

import {
  listArticleSlugs,
  readArticleFile,
  writeArticleFile,
  deleteArticleFile,
} from '@/lib/admin-content';
import type { ArticleFrontmatter } from '@/types/article';

export async function GET() {
  const slugs = await listArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readArticleFile(slug);
      const { data } = matter(raw);
      return { slug, ...(data as ArticleFrontmatter) };
    })
  );
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      slug: string;
      frontmatter: ArticleFrontmatter;
      content: string;
    };
    const raw = matter.stringify(
      body.content,
      body.frontmatter as Record<string, unknown>
    );
    await writeArticleFile(body.slug, raw);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { slug } = (await req.json()) as { slug: string };
    await deleteArticleFile(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = (await req.json()) as { slug: string };
  const raw = await readArticleFile(body.slug);
  const { data, content } = matter(raw);
  return NextResponse.json({ frontmatter: data, content });
}
