import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Footer: React.FC = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  return (
    <footer className="bg-[#121225] border-t border-[#252538] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-[#00f0ff] animate-[glow_2s_ease-in-out_infinite_alternate] inline-block w-6 h-6 rounded-full border-2 border-[#00f0ff]"></span>
              <span className="font-space text-2xl font-bold gradient-text">COSMIC BLOG</span>
            </div>
            <p className="text-gray-400 mb-6">
              Exploring the frontiers of science, technology, and human innovation through a cosmic lens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e2a] flex items-center justify-center hover:bg-[#252538] transition-colors">
                <i className="fab fa-twitter text-gray-300"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e2a] flex items-center justify-center hover:bg-[#252538] transition-colors">
                <i className="fab fa-facebook-f text-gray-300"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e2a] flex items-center justify-center hover:bg-[#252538] transition-colors">
                <i className="fab fa-instagram text-gray-300"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1e1e2a] flex items-center justify-center hover:bg-[#252538] transition-colors">
                <i className="fab fa-linkedin-in text-gray-300"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-space font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#featured-articles" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                  Featured Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-space font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link href={`/categories/${category.slug}`} className="text-gray-400 hover:text-[#00f0ff] transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-space font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#00f0ff]"></i>
                <span className="text-gray-400">info@cosmicblog.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3 text-[#00f0ff]"></i>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#00f0ff]"></i>
                <span className="text-gray-400">
                  1234 Cosmic Way<br />
                  Silicon Valley, CA 94043
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#252538] pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Cosmic Blog. All rights reserved. Designed with ❤️ for the future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
