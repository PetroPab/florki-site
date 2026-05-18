'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import OrderModal from '@/components/modals/OrderModal';

type OrderButtonProps = {
  productName: string;
  productSlug: string;
};

export default function OrderButton({
  productName,
  productSlug,
}: OrderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 h-14 px-8 w-full sm:w-auto rounded-full bg-accent text-white font-medium text-base hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
        Заказать
      </button>

      <OrderModal
        isOpen={open}
        onClose={() => setOpen(false)}
        productName={productName}
        productSlug={productSlug}
      />
    </>
  );
}
