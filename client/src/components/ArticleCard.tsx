import { Link } from 'wouter';

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

interface ArticleCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  readTime = 5
}) => {
  // Format the published date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Determine category color based on name
  const getCategoryColor = (categoryName: string) => {
    const colorMap: Record<string, string> = {
      'Technology': 'bg-[#00f0ff]/80',
      'AI & Robotics': 'bg-[#ff00e6]/80',
      'Science': 'bg-[#0aff9d]/80',
      'Space': 'bg-[#00f0ff]/80',
      'Cyber Security': 'bg-[#0aff9d]/80'
    };
    
    return colorMap[categoryName] || 'bg-[#00f0ff]/80';
  };

  return (
    <article className="card-holographic h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Link href={`/articles/${slug}`}>
          <img 
            src={featuredImage} 
            alt={title} 
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
        </Link>
        <div className="absolute top-4 left-4">
          <Link href={`/categories/${category.slug}`}>
            <span className={`${getCategoryColor(category.name)} text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm`}>
              {category.name}
            </span>
          </Link>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <Link href={`/articles/${slug}`}>
          <h3 className="text-xl font-space font-bold mb-3 line-clamp-2 hover:text-[#00f0ff] transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#2c2c42]">
          <div className="flex items-center">
            <img src={author.avatarUrl} alt={author.name} className="w-8 h-8 rounded-full mr-2" />
            <span className="text-sm text-gray-400">{author.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <span className="mr-2">{formatDate(publishedAt)}</span>
            <span className="px-1">•</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
