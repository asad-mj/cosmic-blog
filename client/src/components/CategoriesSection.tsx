import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

const CategoriesSection: React.FC = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  if (isLoading) {
    return (
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="font-space text-3xl md:text-4xl font-bold mb-2">Explore Categories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e6] rounded-full mb-10"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-holographic h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Define colors for each category type
  const categoryColors: Record<string, { bg: string, text: string }> = {
    'Technology': { 
      bg: 'bg-[#00f0ff]/20', 
      text: 'text-[#00f0ff]' 
    },
    'AI & Robotics': { 
      bg: 'bg-[#ff00e6]/20', 
      text: 'text-[#ff00e6]' 
    },
    'Science': { 
      bg: 'bg-[#0aff9d]/20', 
      text: 'text-[#0aff9d]' 
    },
    'Space': { 
      bg: 'bg-[#ffaa00]/20', 
      text: 'text-[#ffaa00]' 
    },
    'Cyber Security': { 
      bg: 'bg-[#0aff9d]/20', 
      text: 'text-[#0aff9d]' 
    }
  };
  
  // Get color for category or default
  const getCategoryColor = (categoryName: string) => {
    return categoryColors[categoryName] || { 
      bg: 'bg-[#00f0ff]/20', 
      text: 'text-[#00f0ff]' 
    };
  };
  
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-space text-3xl md:text-4xl font-bold mb-2">Explore Categories</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e6] rounded-full mb-10"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category) => {
            const colorStyle = getCategoryColor(category.name);
            
            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <a className="card-holographic p-6 flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 rounded-full ${colorStyle.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <i className={`fas fa-${category.iconName} text-2xl ${colorStyle.text}`}></i>
                  </div>
                  <h3 className="font-space font-bold text-xl mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                  <span className={`${colorStyle.text} text-sm mt-auto`}>
                    Explore Articles
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/categories" 
            className="inline-block border border-[#2c2c42] rounded-full px-6 py-3 text-gray-300 hover:bg-[#1e1e2a] transition-all"
          >
            View All Categories
            <i className="fas fa-chevron-right ml-2 text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
