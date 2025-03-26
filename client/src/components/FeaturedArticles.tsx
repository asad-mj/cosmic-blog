import { useQuery } from '@tanstack/react-query';
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

const FeaturedArticles: React.FC = () => {
  const { data: featuredPosts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts/featured'],
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const { data: users } = useQuery<Author[]>({
    queryKey: ['/api/users'],
    enabled: !!featuredPosts,
  });
  
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
      <section id="featured-articles" className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-2">Featured Articles</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e6] rounded-full mb-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-holographic h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="featured-articles" className="py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-space text-3xl md:text-4xl font-bold mb-2">Featured Articles</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e6] rounded-full mb-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts?.map(post => (
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
      </div>
    </section>
  );
};

export default FeaturedArticles;
