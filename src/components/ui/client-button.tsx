'use client';

import React from 'react';
import { Button, type ButtonProps } from './button';

/**
 * Client-side Button wrapper to ensure proper event handler support
 * Use this when you encounter "Event handlers cannot be passed to Client Component props" errors
 */
export const ClientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  }
);

ClientButton.displayName = 'ClientButton';