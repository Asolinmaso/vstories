import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/profile/', '/account/'],
            },
        ],
        sitemap: 'https://vstories.in/sitemap.xml',
    };
}
