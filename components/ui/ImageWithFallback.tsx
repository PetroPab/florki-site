'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

type Props = Omit<ComponentPropsWithoutRef<typeof Image>, 'src'> & {
  src: string;
  fallback?: string;
};

export default function ImageWithFallback({
  src,
  fallback = '/images/placeholder.svg',
  alt,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      unoptimized={imgSrc === fallback}
    />
  );
}
