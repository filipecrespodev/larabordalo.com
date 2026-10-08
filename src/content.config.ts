import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blocks = (image: SchemaContext['image']) =>
  z.array(
    z.discriminatedUnion('type', [
      // Single full-width image (`width` is a % of the content column).
      z.object({ type: z.literal('image'), src: image(), width: z.number().optional() }),
      // Justified row(s) of images.
      z.object({ type: z.literal('grid'), images: z.array(image()), width: z.number().optional() }),
      // Rich text, as trusted HTML (<p>, <strong>, <em>, <a>, <br>).
      z.object({ type: z.literal('text'), html: z.string() }),
      // Raw embed (iframe) for videos etc.
      z.object({ type: z.literal('embed'), html: z.string() }),
    ]),
  );

/** Portuguese overrides; anything missing falls back to the English field. */
const pt = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    medium: z.string().optional(),
    format: z.string().optional(),
  })
  .default({});

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** `book` goes to /books, `illustration` to the /illustration wall. */
      kind: z.enum(['book', 'illustration']),
      year: z.number().optional(),
      /** Filter chip on /illustration (e.g. "Narrative"). */
      category: z.string().optional(),
      medium: z.string().optional(),
      /** Position in listings (ascending). */
      order: z.number(),
      cover: image(),
      /** Front cover for the 3D book on /books (defaults to `cover`). */
      bookCover: image().optional(),
      description: z.string().optional(),
      // Book details, shown on /books.
      author: z.string().optional(),
      publisher: z.string().optional(),
      format: z.string().optional(),
      /** Relative size on the /illustration wall. */
      size: z.enum(['s', 'm', 'l']).default('m'),
      draft: z.boolean().default(false),
      pt,
      blocks: blocks(image),
    }),
});

const bio = z.object({
  lead: z.string(),
  paragraphs: z.array(z.string()),
  facts: z.array(z.object({ label: z.string(), value: z.string() })),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      portrait: image(),
      en: bio,
      pt: bio,
    }),
});

export const collections = { projects, pages };
