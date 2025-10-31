import { getRssString } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET = async (context: { site: URL | undefined }) => {
  const posts = await getCollection('blog');
  const publishedPosts = posts.filter((post) => !post.data.draft);

  const rss = await getRssString({
    title: "Ryan Keairns — POC Design Portfolio",
    description: "Principal Designer using AI tools to move from ideas to working proofs of concept.",
    site: context.site || 'https://ryankeairns.com',

    items: publishedPosts.map((post) => ({
      link: `/poc/${post.id.replace(/\.mdx?$/, '')}`,
      title: post.data.title,
      description: post.data.description || post.data.subTitle || '',
      pubDate: post.data.date,
    })),
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
