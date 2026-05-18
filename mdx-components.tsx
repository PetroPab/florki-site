import type { MDXComponents } from 'mdx/types';
import Callout from '@/components/blocks/Callout';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
  };
}
