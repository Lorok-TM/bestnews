import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

// ─── AMUNISI PUNGKASAN: OPER PATH MENYANG ROOT NJABA (RASA HUGO) ───
// Ganti sing maune "src/content/posts" dadi langsung folder "content/posts" ing njobo
export const BLOG_PATH = "content/posts";

const posts = defineCollection({
  // Base diarahne neng folder root njobo
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const pages = defineCollection({
  // Sisan folder pages-e dioper metu sisan neng folder "content/pages" ben merdeka kabeh
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };