import fs from 'fs/promises';
import path from 'path';

import {
  githubGetFile,
  githubListDir,
  githubSaveFile,
  githubDeleteFile,
} from '@/lib/github-api';

const isDev = process.env.NODE_ENV === 'development';

async function triggerDeploy(): Promise<void> {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl || isDev) return;
  await fetch(hookUrl, { method: 'POST' }).catch(() => {});
}

// ─── JSON-файлы data/ ────────────────────────────────────────────────────────

export async function readDataFile<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), 'data', filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

export async function writeDataFile(
  filename: string,
  data: unknown
): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  if (isDev) {
    const filePath = path.join(process.cwd(), 'data', filename);
    await fs.writeFile(filePath, content, 'utf-8');
  } else {
    await githubSaveFile(
      `data/${filename}`,
      content,
      `content: update ${filename}`
    );
    await triggerDeploy();
  }
}

// ─── MDX статьи ──────────────────────────────────────────────────────────────

export async function listArticleSlugs(): Promise<string[]> {
  if (isDev) {
    const dir = path.join(process.cwd(), 'content', 'articles');
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''));
  } else {
    const items = await githubListDir('content/articles');
    return items
      .filter((f) => f.name.endsWith('.mdx'))
      .map((f) => f.name.replace('.mdx', ''));
  }
}

export async function readArticleFile(slug: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    'content',
    'articles',
    `${slug}.mdx`
  );
  return fs.readFile(filePath, 'utf-8');
}

export async function writeArticleFile(
  slug: string,
  content: string
): Promise<void> {
  if (isDev) {
    const filePath = path.join(
      process.cwd(),
      'content',
      'articles',
      `${slug}.mdx`
    );
    await fs.writeFile(filePath, content, 'utf-8');
  } else {
    await githubSaveFile(
      `content/articles/${slug}.mdx`,
      content,
      `content: update article ${slug}`
    );
    await triggerDeploy();
  }
}

export async function deleteArticleFile(slug: string): Promise<void> {
  if (isDev) {
    const filePath = path.join(
      process.cwd(),
      'content',
      'articles',
      `${slug}.mdx`
    );
    await fs.unlink(filePath);
  } else {
    const { sha } = await githubGetFile(`content/articles/${slug}.mdx`);
    await githubDeleteFile(
      `content/articles/${slug}.mdx`,
      `content: delete article ${slug}`,
      sha
    );
    await triggerDeploy();
  }
}
