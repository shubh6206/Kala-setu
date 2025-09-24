import { z } from 'zod';

// File upload validation
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'File must be an image',
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
      {
        message: 'File must be JPEG, PNG, WebP, or GIF',
      }
    ),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

// Artisan registration validation
export const artisanRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  craft: z
    .string()
    .min(2, 'Craft type must be at least 2 characters')
    .max(50, 'Craft type must be less than 50 characters'),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),
  experience: z
    .number()
    .min(0, 'Experience cannot be negative')
    .max(100, 'Experience must be less than 100 years'),
  story: z
    .string()
    .min(50, 'Story must be at least 50 characters')
    .max(2000, 'Story must be less than 2000 characters'),
  portfolio: z
    .array(z.instanceof(File))
    .min(1, 'Please upload at least one portfolio image')
    .max(10, 'Maximum 10 portfolio images allowed'),
});

// Search validation
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query must be less than 100 characters'),
  category: z
    .enum(['all', 'artisans', 'crafts', 'locations'])
    .optional()
    .default('all'),
});

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
});

export type FileUpload = z.infer<typeof fileUploadSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type ArtisanRegistration = z.infer<typeof artisanRegistrationSchema>;
export type Search = z.infer<typeof searchSchema>;
export type Newsletter = z.infer<typeof newsletterSchema>;