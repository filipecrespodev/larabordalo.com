import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** Published projects in listing order. */
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** Text fields of a project in the given language (falls back to English). */
export function localize(project: Project, lang: Lang) {
  const { data } = project;
  const o = lang === 'en' ? {} : data[lang];
  return {
    title: o.title ?? data.title,
    description: o.description ?? data.description,
    category: o.category ?? data.category,
    medium: o.medium ?? data.medium,
    format: o.format ?? data.format,
  };
}

/** Every image of a project, in page order (blocks only, without the cover). */
export function projectImages(project: Project): ImageMetadata[] {
  return project.data.blocks.flatMap((b) => (b.type === 'image' ? [b.src] : b.type === 'grid' ? b.images : []));
}

/** `Year · medium` line used in captions. */
export const metaLine = (year?: number, medium?: string) => [year, medium].filter(Boolean).join(' · ');
