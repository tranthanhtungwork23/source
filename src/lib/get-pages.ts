import { GraphQLClient, gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface Page {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
        }
    };
}

// Fallback data for development if API is not configured
const DUMMY_PAGES: Page[] = [
    {
        id: '1',
        title: "About Us",
        slug: 'about',
        content: '<p>Welcome to TechnoVerse. We are dedicated to bringing you the latest in future technology news.</p>',
        date: '2024-01-01',
        featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop' } }
    },
    {
        id: '2',
        title: "Contact",
        slug: 'contact',
        content: '<p>Contact us at info@technoverse.com for any inquiries.</p>',
        date: '2024-01-01',
        featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop' } }
    }
];

export async function getPages(): Promise<Page[]> {
    if (!API_URL || API_URL.includes('api.tttintech.io.vn')) {
        console.warn('WordPress API URL is not configured. Returning dummy data for Pages.');
        return DUMMY_PAGES;
    }

    const client = new GraphQLClient(API_URL);

    const query = gql`
    query GetPages {
      pages(first: 100) {
        nodes {
          id
          title
          slug
          date
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

    try {
        const data: any = await client.request(query);
        return data.pages.nodes;
    } catch (error) {
        console.error('Error fetching pages:', error);
        return DUMMY_PAGES;
    }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
    if (!API_URL || API_URL.includes('api.tttintech.io.vn')) {
        return DUMMY_PAGES.find(p => p.slug === slug) || null;
    }

    const client = new GraphQLClient(API_URL);

    const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;

    try {
        const data: any = await client.request(query, { slug });
        return data.page;
    } catch (error) {
        // Try to find if it's a sub-page or different URI structure if needed, but for simple slug match:
        console.error(`Error fetching page with slug ${slug}:`, error);
        return null;
    }
}
