import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';

interface Category {
  id: number;
  name: string;
  slug: string;
  iconName: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  return (
    <header className="sticky top-0 z-50 bg-[#121225]/80 backdrop-blur-md border-b border-[#252538]">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-[#00f0ff] animate-pulse inline-block w-6 h-6 rounded-full border-2 border-[#00f0ff]"></span>
          <span className="font-space text-2xl font-bold gradient-text">COSMIC BLOG</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="lg:hidden text-gray-200 hover:text-[#00f0ff] transition-colors p-2"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="/" 
                className={`py-2 ${location === '/' ? 'text-[#00f0ff]' : 'text-gray-200 hover:text-[#00f0ff]'} transition-colors`}
              >
                Home
              </Link>
            </li>
            <li className="group relative">
              <button className="text-gray-200 hover:text-[#00f0ff] transition-colors py-2 flex items-center">
                Categories
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-48 hidden group-hover:block">
                <div className="bg-[#1e1e2a] rounded-md shadow-lg border border-[#2c2c42] overflow-hidden">
                  {categories?.map((category) => (
                    <Link 
                      key={category.id}
                      href={`/categories/${category.slug}`} 
                      className="block px-4 py-2 hover:bg-[#252538] transition-colors"
                    >
                      <i className={`fas fa-${category.iconName} mr-2`}></i>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link 
                href="/#featured-articles" 
                className="text-gray-200 hover:text-[#00f0ff] transition-colors py-2"
              >
                Featured
              </Link>
            </li>
            <li>
              <Link 
                href="/#subscribe" 
                className="text-gray-200 hover:text-[#00f0ff] transition-colors py-2"
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <form className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-[#1e1e2a] text-gray-200 border border-[#2c2c42] rounded-full px-4 py-1 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] placeholder-gray-500 transition-all w-40 focus:w-56"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <button className="neon-border rounded-full px-4 py-1 bg-[#1e1e2a] text-[#00f0ff] hover:bg-[#252538] transition-colors">
            Sign In
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full mt-4 lg:hidden`}>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link 
                href="/" 
                className={`block px-4 py-2 rounded-md hover:bg-[#1e1e2a] transition-colors ${location === '/' ? 'text-[#00f0ff]' : 'text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button className="flex justify-between items-center w-full px-4 py-2 rounded-md hover:bg-[#1e1e2a] transition-colors text-gray-200">
                Categories
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <div className="pl-6 mt-1 border-l border-[#2c2c42] space-y-1">
                {categories?.map((category) => (
                  <Link 
                    key={category.id}
                    href={`/categories/${category.slug}`} 
                    className="block px-4 py-1 rounded-md hover:bg-[#1e1e2a] transition-colors text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`fas fa-${category.iconName} mr-2`}></i>
                    {category.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link 
                href="/#featured-articles" 
                className="block px-4 py-2 rounded-md hover:bg-[#1e1e2a] transition-colors text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured
              </Link>
            </li>
            <li>
              <Link 
                href="/#subscribe" 
                className="block px-4 py-2 rounded-md hover:bg-[#1e1e2a] transition-colors text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscribe
              </Link>
            </li>
            <li className="pt-2 border-t border-[#252538]">
              <form className="px-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-[#1e1e2a] text-gray-200 border border-[#2c2c42] rounded-full px-4 py-2 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] placeholder-gray-500"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </li>
            <li>
              <button className="w-full text-center neon-border rounded-full px-4 py-2 bg-[#1e1e2a] text-[#00f0ff] hover:bg-[#252538] transition-colors mt-2">
                Sign In
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
