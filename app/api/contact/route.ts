import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100),
  contact: z.string().min(5).max(200),
  message: z.string().min(10).max(1000),
  agree: z.literal(true),
  website: z.string().max(0),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 422 });
  }

  const { name, contact, message, website } = result.data;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Флорки <noreply@florki.ru>',
      to: process.env.RESEND_TO ?? 'hello@florki.ru',
      subject: `Заявка от ${name}`,
      text: `Имя: ${name}\nКонтакт: ${contact}\n\n${message}`,
    });
  }

  return NextResponse.json({ ok: true });
}
