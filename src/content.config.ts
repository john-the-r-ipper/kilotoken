import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(10).max(80),
    description: z.string().min(70).max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Kilotoken Editorial'),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).min(1),
    mentionsPublisher: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
