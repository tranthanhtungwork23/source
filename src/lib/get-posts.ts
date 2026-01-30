import { GraphQLClient, gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
        }
    };
}

// Fallback data for development if API is not configured
const DUMMY_POSTS: Post[] = [
    {
        id: '1',
        title: "NEURALINK'S NEXT LEAP: BRAIN-MACHINE INTERFACE UNVEILED",
        slug: 'neuralink-next-leap',
        excerpt: "Musk's vision for seamless human-AI integration takes a giant step forward. Full report and analysis.",
        content: '<p>Full content of the article goes here...</p>',
        date: '2024-05-20',
        featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1614728853913-1e3258af70d7?q=80&w=2070&auto=format&fit=crop' } }
    },
    {
        id: '2',
        title: "QUANTUM COMPUTING EXASCALE BARRIER",
        slug: 'quantum-computing',
        excerpt: 'Breaking the speed limit of the universe with new q-bit technology.',
        content: '<p>Quantum computing content...</p>',
        date: '2024-05-18',
        featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop' } }
    },
    {
        id: '3',
        title: "INTERSTELLAR MINING",
        slug: 'interstellar-mining',
        excerpt: 'The race to the asteroid belt implies new economic frontiers.',
        content: '<p>Space mining content...</p>',
        date: '2024-05-15',
        featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' } }
    },
    {
        id: '4',
        title: "SUSTAINABLE TECH: BIO-BATTERIES",
        slug: 'sustainable-tech',
        excerpt: 'Powering the future with organic energy storage solutions.',
        content: '<p>Green tech content...</p>',
        date: '2024-05-10',
        featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop' } }
    }
];

export async function getPosts(): Promise<Post[]> {
    if (!API_URL || API_URL.includes('your-wordpress-site.com')) {
        console.warn('WordPress API URL is not configured. Returning dummy data.');
        return DUMMY_POSTS;
    }

    const client = new GraphQLClient(API_URL);

    const query = gql`
    query GetPosts {
      posts(first: 10) {
        nodes {
          id
          title
          slug
          excerpt
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
        return data.posts.nodes;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return DUMMY_POSTS;
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!API_URL || API_URL.includes('your-wordpress-site.com')) {
        return DUMMY_POSTS.find(p => p.slug === slug) || null;
    }

    const client = new GraphQLClient(API_URL);

    const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        excerpt
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
        return data.post;
    } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error);
        return null;
    }
}
