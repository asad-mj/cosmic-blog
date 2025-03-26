import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import ThreeJsObject from './ThreeJsObject';

interface Author {
  id: number;
  name: string;
  avatarUrl: string;
  bio?: string;
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

const SpotlightArticle: React.FC = () => {
  const { data: spotlightPost, isLoading } = useQuery<Post>({
    queryKey: ['/api/posts/spotlight'],
  });
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  const { data: users } = useQuery<Author[]>({
    queryKey: ['/api/users'],
    enabled: !!spotlightPost,
  });
  
  // Find category and author
  const category = spotlightPost && categories 
    ? categories.find(cat => cat.id === spotlightPost.categoryId) 
    : null;
  
  const author = spotlightPost && users
    ? users.find(user => user.id === spotlightPost.authorId)
    : null;
  
  if (isLoading || !spotlightPost) {
    return (
      <section className="py-20 relative overflow-hidden spotlight-section">
        <div className="absolute inset-0 bg-[#452b6a]/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="h-8 w-40 bg-[#1e1e2a] rounded-full animate-pulse mb-4"></div>
              <div className="h-12 w-full bg-[#1e1e2a] rounded-lg animate-pulse mb-4"></div>
              <div className="h-12 w-5/6 bg-[#1e1e2a] rounded-lg animate-pulse mb-6"></div>
              <div className="h-20 w-full bg-[#1e1e2a] rounded-lg animate-pulse mb-8"></div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative rounded-xl overflow-hidden border border-[#2c2c42] shadow-lg bg-[#1e1e2a] h-80 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-20 relative overflow-hidden spotlight-section">
      <div className="absolute inset-0 bg-[#452b6a]/10 z-0"></div>
      <ThreeJsObject type="rover" className="absolute bottom-0 right-0 w-1/3 h-1/2 hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10 fade-in">
            <span className="inline-block bg-[#ffaa00]/20 text-[#ffaa00] px-4 py-1 rounded-full text-sm mb-4">
              Spotlight Feature
            </span>
            <h2 className="font-space text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {spotlightPost.title}
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              {spotlightPost.excerpt}
            </p>
            {author && (
              <div className="flex items-center mb-6">
                <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-medium">{author.name}</div>
                  <div className="text-sm text-gray-400">{author.bio || (category ? `${category.name} Specialist` : '')}</div>
                </div>
              </div>
            )}
            <Link 
              href={`/articles/${spotlightPost.slug}`} 
              className="neon-border inline-block rounded-full px-8 py-3 bg-[#1e1e2a] text-[#00f0ff] font-medium hover:bg-[#252538] transition-all"
            >
              Read Full Article
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          <div className="w-full md:w-1/2 fade-in">
            <div className="relative rounded-xl overflow-hidden border border-[#2c2c42] shadow-lg">
              <img 
                src={spotlightPost.featuredImage} 
                alt={spotlightPost.title} 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121225]/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-300">{spotlightPost.readTime} min read</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-300">{category?.name || 'General'}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full bg-[#1e1e2a]/80 flex items-center justify-center hover:bg-[#252538] transition-colors">
                    <i className="fas fa-bookmark"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#1e1e2a]/80 flex items-center justify-center hover:bg-[#252538] transition-colors">
                    <i className="fas fa-share-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightArticle;
