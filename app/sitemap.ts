import { MetadataRoute } from 'next';
import schemes from '@/data/schemes.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saral-yojana.vercel.app';
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schemes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const schemePages: MetadataRoute.Sitemap = schemes.map((scheme) => ({
    url: `${baseUrl}/schemes/${scheme.id}`,
    lastModified: new Date(scheme.portal_last_updated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...schemePages];
}
