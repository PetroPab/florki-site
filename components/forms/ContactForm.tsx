'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Checkbox from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  contact: z.string().min(5, 'Укажите телефон или Telegram'),
  message: z.string().min(10, 'Опишите, что хотите заказать').max(1000),
  agree: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо согласие' }),
  }),
  website: z.string().max(0),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle
          size={40}
          className="text-success"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="font-display text-h3 text-text-primary">
          Заявка отправлена!
        </p>
        <p className="text-sm text-text-muted max-w-xs">
          Ответим в Telegram или по контакту, который вы указали, в течение 15
          минут.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        {...register('website')}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />

      <Input
        label="Ваше имя"
        {...register('name')}
        type="text"
        autoComplete="name"
        error={errors.name?.message}
        required
      />
      <Input
        label="Telegram или телефон"
        {...register('contact')}
        type="text"
        hint="Как вам ответить — @username или +7..."
        error={errors.contact?.message}
        required
      />
      <Textarea
        label="Что хотите заказать?"
        {...register('message')}
        hint="Расскажите об идее, размере, бюджете — любые детали помогут"
        error={errors.message?.message}
        required
      />

      <Checkbox
        label={
          <span>
            Соглашаюсь с{' '}
            <a
              href="/legal/privacy"
              className="text-accent underline underline-offset-2 hover:no-underline"
            >
              политикой конфиденциальности
            </a>
          </span>
        }
        {...register('agree')}
        error={errors.agree?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'flex items-center justify-center gap-2 w-full h-12 rounded-full bg-accent text-white font-medium text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          isSubmitting
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:bg-accent-hover hover:-translate-y-0.5 shadow-sm hover:shadow-md'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          'Отправить заявку'
        )}
      </button>
    </form>
  );
}
