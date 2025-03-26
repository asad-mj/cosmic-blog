import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import ArticleCard from './ArticleCard';

interface Author {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  categoryId: number;
  authorId: number;
  readTime: number;
}

const LatestArticles: React.FC = () => {
  const { data: latestPosts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const { data: users } = useQuery<Author[]>({
    queryKey: ['/api/users'],
    enabled: !!latestPosts,
  });
  
  // Filter out featured posts and get latest standard posts
  const standardPosts = latestPosts?.filter(post => !post.featured).slice(0, 3);
  
  // Find category and author for each post
  const getCategory = (categoryId: number) => {
    return categories?.find(cat => cat.id === categoryId) || { id: 0, name: 'Uncategorized', slug: 'uncategorized' };
  };
  
  const getAuthor = (authorId: number) => {
    return users?.find(user => user.id === authorId) || { 
      id: 0, 
      name: 'Unknown Author', 
      avatarUrl: 'https://i.pravatar.cc/300'
    };
  };
  
  if (isLoading) {
    return (
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="font-space text-3xl md:text-4xl font-bold mb-2">Latest Articles</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e6] rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-holographic h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="font-space text-3xl md:text-4xl font-bold mb-2">Latest Articles</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e6] rounded-full"></div>
          </div>
          <div className="hidden md:flex space-x-2">
            <button className="w-10 h-10 rounded-full border border-[#2c2c42] flex items-center justify-center hover:bg-[#252538] transition-colors">
              <i className="fas fa-chevron-left text-sm"></i>
            </button>
            <button className="w-10 h-10 rounded-full border border-[#2c2c42] flex items-center justify-center hover:bg-[#252538] transition-colors">
              <i className="fas fa-chevron-right text-sm"></i>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {standardPosts?.map(post => (
            <ArticleCard
              key={post.id}
              id={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              featuredImage={post.featuredImage}
              category={getCategory(post.categoryId)}
              author={getAuthor(post.authorId)}
              publishedAt={post.publishedAt}
              readTime={post.readTime}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href="/articles" 
            className="neon-border inline-block rounded-full px-8 py-3 bg-[#1e1e2a] text-[#00f0ff] font-medium hover:bg-[#252538] transition-all"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
