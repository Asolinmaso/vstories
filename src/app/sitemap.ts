import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/services/product.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://vstories.in';
    
    // Static pages
    const staticPages = [
        '',
        '/about',
        '/shop',
        '/shop/hair',
        '/shop/skin',
        '/shop/combos',
        '/shop/bestsellers',
        '/contact',
        '/feedback',
        '/login',
        '/signup',
        '/policies/privacy',
        '/policies/terms',
        '/policies/shipping',
        '/policies/returns',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic product pages
    try {
        const products = await getProducts();
        const productPages = products.map((product) => ({
            url: `${baseUrl}/product/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }));

        return [...staticPages, ...productPages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticPages;
    }
}
