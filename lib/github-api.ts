const BASE = 'https://api.github.com';

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

function repoBase() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  if (!owner || !repo) throw new Error('GITHUB_OWNER / GITHUB_REPO не заданы');
  return `${BASE}/repos/${owner}/${repo}`;
}

const branch = () => process.env.GITHUB_BRANCH ?? 'main';

export async function githubGetFile(
  path: string
): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${repoBase()}/contents/${path}?ref=${branch()}`, {
    headers: githubHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GitHub GET ${path}: ${res.status}`);
  const data = (await res.json()) as { content: string; sha: string };
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

export async function githubListDir(
  dir: string
): Promise<Array<{ name: string; path: string; sha: string }>> {
  const res = await fetch(`${repoBase()}/contents/${dir}?ref=${branch()}`, {
    headers: githubHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GitHub LIST ${dir}: ${res.status}`);
  return res.json() as Promise<
    Array<{ name: string; path: string; sha: string }>
  >;
}

export async function githubSaveFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  let fileSha = sha;
  if (!fileSha) {
    try {
      fileSha = (await githubGetFile(path)).sha;
    } catch {
      // новый файл — sha не нужен
    }
  }

  const res = await fetch(`${repoBase()}/contents/${path}`, {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch: branch(),
      ...(fileSha ? { sha: fileSha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub PUT ${path}: ${JSON.stringify(err)}`);
  }
}

export async function githubSaveBinary(
  path: string,
  data: ArrayBuffer,
  message: string,
  sha?: string
): Promise<void> {
  let fileSha = sha;
  if (!fileSha) {
    try {
      fileSha = (await githubGetFile(path)).sha;
    } catch {
      // новый файл
    }
  }

  const base64 = Buffer.from(data).toString('base64');
  const res = await fetch(`${repoBase()}/contents/${path}`, {
    method: 'PUT',
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      content: base64,
      branch: branch(),
      ...(fileSha ? { sha: fileSha } : {}),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub PUT binary ${path}: ${JSON.stringify(err)}`);
  }
}

export async function githubDeleteFile(
  path: string,
  message: string,
  sha: string
): Promise<void> {
  const res = await fetch(`${repoBase()}/contents/${path}`, {
    method: 'DELETE',
    headers: githubHeaders(),
    body: JSON.stringify({ message, sha, branch: branch() }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub DELETE ${path}: ${JSON.stringify(err)}`);
  }
}
