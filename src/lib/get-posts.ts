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

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface SiteSettings {
  title: string;
  description: string;
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
    title: "AI ARTISTS: THE ETHICS OF CREATIVE AUTOMATION",
    slug: 'ai-artists',
    excerpt: 'Navigating the blurred lines between human creativity and machine generation.',
    content: '<p>AI Art content...</p>',
    date: '2024-05-12',
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2128&auto=format&fit=crop' } }
  },
  {
    id: '5',
    title: "SUSTAINABLE TECH: BIO-BATTERIES",
    slug: 'sustainable-tech',
    excerpt: 'Powering the future with organic energy storage solutions.',
    content: '<p>Green tech content...</p>',
    date: '2024-05-10',
    featuredImage: { node: { sourceUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop' } }
  }
];

const DUMMY_CATEGORIES: Category[] = [
  { id: '1', name: 'News', slug: 'news', count: 5 },
  { id: '2', name: 'Blockchain & Web3', slug: 'blockchain-web3', count: 3 },
  { id: '3', name: 'Cybersecurity', slug: 'cybersecurity', count: 2 },
  { id: '4', name: 'Ed Tech', slug: 'educational-technology', count: 1 },
  { id: '5', name: 'Metaverse', slug: 'metaverse', count: 4 },
  { id: '6', name: 'Nanotech', slug: 'nanotech', count: 2 },
  { id: '7', name: 'Robotics', slug: 'robotics', count: 3 },
  { id: '8', name: 'Space', slug: 'space-exploration', count: 5 },
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

export async function getCategoryBySlug(slug: string): Promise<{ name: string; posts: Post[] } | null> {
  if (!API_URL || API_URL.includes('your-wordpress-site.com')) {
    const category = DUMMY_CATEGORIES.find(c => c.slug === slug);
    return { name: category ? category.name : slug.toUpperCase(), posts: DUMMY_POSTS };
  }

  const client = new GraphQLClient(API_URL);

  const query = gql`
    query GetCategoryBySlug($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        name
        posts(first: 20) {
          nodes {
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
      }
    }
  `;

  try {
    const data: any = await client.request(query, { slug });
    if (!data.category) return null;
    return {
      name: data.category.name,
      posts: data.category.posts.nodes
    };
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!API_URL || API_URL.includes('your-wordpress-site.com')) {
    return DUMMY_CATEGORIES;
  }

  const client = new GraphQLClient(API_URL);

  const query = gql`
        query GetCategories {
            categories(first: 20, where: { hideEmpty: true }) {
                nodes {
                    id
                    name
                    slug
                    count
                }
            }
        }
    `;

  try {
    const data: any = await client.request(query);
    return data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return DUMMY_CATEGORIES;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!API_URL || API_URL.includes('your-wordpress-site.com')) {
    return { title: 'TechnoVerse', description: 'Your portal to the future of technology.' };
  }

  const client = new GraphQLClient(API_URL);

  const query = gql`
        query GetSiteSettings {
            generalSettings {
                title
                description
            }
        }
    `;

  try {
    const data: any = await client.request(query);
    return data.generalSettings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return { title: 'TechnoVerse', description: 'Your portal to the future of technology.' };
  }
}
