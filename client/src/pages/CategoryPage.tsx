import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import ArticleCard from '@/components/ArticleCard';
import ThreeJsObject from '@/components/ThreeJsObject';
import { animateCards } from '@/lib/animations';

interface Author {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
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

const CategoryPage: React.FC<{ slug: string }> = ({ slug }) => {
  // Fetch category data
  const { data: category, isLoading: isLoadingCategory } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
  });
  
  // Fetch category posts
  const { data: categoryPosts, isLoading: isLoadingPosts } = useQuery<Post[]>({
    queryKey: [`/api/categories/${slug}/posts`],
    enabled: !!category,
  });
  
  // Fetch users data for author info
  const { data: users } = useQuery<Author[]>({
    queryKey: ['/api/users'],
    enabled: !!categoryPosts && categoryPosts.length > 0,
  });
  
  // Find author for each post
  const getAuthor = (authorId: number) => {
    return users?.find(user => user.id === authorId) || { 
      id: 0, 
      name: 'Unknown Author', 
      avatarUrl: 'https://i.pravatar.cc/300'
    };
  };
  
  useEffect(() => {
    // Animate cards when they enter viewport
    animateCards();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Define colors for each category
  const getCategoryColor = (categoryName: string | undefined) => {
    if (!categoryName) return { bg: 'bg-[#00f0ff]/10', text: 'text-[#00f0ff]' };
    
    const colorMap: Record<string, { bg: string, text: string }> = {
      'Technology': { bg: 'bg-[#00f0ff]/10', text: 'text-[#00f0ff]' },
      'AI & Robotics': { bg: 'bg-[#ff00e6]/10', text: 'text-[#ff00e6]' },
      'Science': { bg: 'bg-[#0aff9d]/10', text: 'text-[#0aff9d]' },
      'Space': { bg: 'bg-[#ffaa00]/10', text: 'text-[#ffaa00]' },
      'Cyber Security': { bg: 'bg-[#0aff9d]/10', text: 'text-[#0aff9d]' }
    };
    
    return colorMap[categoryName] || { bg: 'bg-[#00f0ff]/10', text: 'text-[#00f0ff]' };
  };
  
  // Get the appropriate 3D object based on category
  const getThreeJsObject = (categoryName: string | undefined) => {
    if (!categoryName) return 'planet';
    
    switch (categoryName) {
      case 'Space':
        return 'planet';
      case 'AI & Robotics':
        return 'rover';
      default:
        return 'spaceship';
    }
  };
  
  const colorStyle = getCategoryColor(category?.name);
  
  if (isLoadingCategory) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="h-10 w-1/3 bg-[#1e1e2a] rounded-lg animate-pulse mb-4"></div>
          <div className="h-6 w-2/3 bg-[#1e1e2a] rounded-lg animate-pulse mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-holographic h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-space font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-400 mb-8">The category you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="neon-border rounded-full px-8 py-3 bg-[#1e1e2a] text-[#00f0ff] font-medium hover:bg-[#252538] transition-all">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen">
      {/* Category Header */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 ${colorStyle.bg} z-0`}></div>
        <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full pointer-events-none z-[1]">
          <ThreeJsObject type={getThreeJsObject(category.name) as any} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className={`w-16 h-16 rounded-full ${colorStyle.bg} flex items-center justify-center mb-6`}>
              <i className={`fas fa-${category.iconName} text-2xl ${colorStyle.text}`}></i>
            </div>
            <h1 className="font-space text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-gray-300 mb-8">{category.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/">
                <a className="rounded-full px-6 py-2 bg-[#1e1e2a]/80 text-gray-300 border border-[#2c2c42] hover:bg-[#1e1e2a] transition-all">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Home
                </a>
              </Link>
              <Link href="#articles">
                <a className={`rounded-full px-6 py-2 ${colorStyle.bg} ${colorStyle.text} hover:bg-opacity-20 transition-all`}>
                  View Articles
                  <i className="fas fa-chevron-down ml-2"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Articles Section */}
      <section id="articles" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-space text-3xl font-bold mb-10">
            Latest in {category.name}
            <div className={`w-20 h-1 ${colorStyle.bg} rounded-full mt-3`}></div>
          </h2>
          
          {isLoadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card-holographic h-64 animate-pulse"></div>
              ))}
            </div>
          ) : !categoryPosts || categoryPosts.length === 0 ? (
            <div className="text-center py-12 bg-[#1e1e2a]/50 rounded-xl border border-[#2c2c42]">
              <i className={`fas fa-${category.iconName} text-4xl ${colorStyle.text} mb-4`}></i>
              <h3 className="text-xl font-medium mb-2">No Articles Found</h3>
              <p className="text-gray-400">
                There are no articles in this category yet. Check back soon for updates!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map(post => (
                <ArticleCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  featuredImage={post.featuredImage}
                  category={category}
                  author={getAuthor(post.authorId)}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                />
              ))}
            </div>
          )}
          
          {/* Pagination (if needed) */}
          {categoryPosts && categoryPosts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="w-10 h-10 rounded-full border border-[#2c2c42] flex items-center justify-center hover:bg-[#252538] transition-colors">
                  <i className="fas fa-chevron-left text-sm"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 flex items-center justify-center">
                  1
                </button>
                <button className="w-10 h-10 rounded-full border border-[#2c2c42] flex items-center justify-center hover:bg-[#252538] transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-full border border-[#2c2c42] flex items-center justify-center hover:bg-[#252538] transition-colors">
                  <i className="fas fa-chevron-right text-sm"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
