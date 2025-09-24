import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  const allItems = showHome ? [{ label: 'Home', href: '/' }, ...items] : items;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        const isHome = showHome && index === 0;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="flex items-center hover:text-foreground transition-colors"
              >
                {isHome && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'flex items-center',
                  isLast ? 'text-foreground font-medium' : ''
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {isHome && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}