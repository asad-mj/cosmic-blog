import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ThreeJsObject from './ThreeJsObject';

interface Category {
  id: number;
  name: string;
  slug: string;
  iconName: string;
}

const HeroSection: React.FC = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  return (
    <section className="relative overflow-hidden py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-10 lg:mb-0 fade-in">
            <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Explore The Future</span>
              <br />Through Our Cosmic Lens
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Discover cutting-edge insights across technology, science, and beyond. Join us on a journey through the digital cosmos.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {categories?.slice(0, 5).map((category) => (
                <Link 
                  key={category.id}
                  href={`/categories/${category.slug}`} 
                  className="category-pill"
                >
                  <i className={`fas fa-${category.iconName} mr-2`}></i>
                  {category.name}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#featured-articles" 
                className="neon-border rounded-full px-8 py-3 bg-gradient-to-r from-[#00f0ff]/20 to-[#ff00e6]/20 text-[#00f0ff] font-medium hover:from-[#00f0ff]/30 hover:to-[#ff00e6]/30 transition-all"
              >
                Explore Articles
              </Link>
              <Link 
                href="#subscribe" 
                className="rounded-full px-8 py-3 bg-transparent border border-gray-300/30 text-gray-200 font-medium hover:bg-gray-200/10 transition-all"
              >
                Subscribe
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative hidden lg:block">
            <ThreeJsObject type="spaceship" className="absolute inset-0" />
            <div className="animate-[float_6s_ease-in-out_infinite]">
              <img
                src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop"
                alt="Futuristic space station"
                className="rounded-lg shadow-xl opacity-90 mx-auto relative z-10 max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
