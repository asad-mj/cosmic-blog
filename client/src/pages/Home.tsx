import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedArticles from '@/components/FeaturedArticles';
import LatestArticles from '@/components/LatestArticles';
import SpotlightArticle from '@/components/SpotlightArticle';
import CategoriesSection from '@/components/CategoriesSection';
import SubscribeSection from '@/components/SubscribeSection';
import ThreeJsObject from '@/components/ThreeJsObject';
import { animateCards } from '@/lib/animations';

const Home: React.FC = () => {
  useEffect(() => {
    // Animate cards when they enter viewport
    animateCards();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main>
      {/* Fixed planet in the top-right corner */}
      <div className="hidden lg:block fixed top-0 right-0 w-1/3 h-screen pointer-events-none z-[-1]">
        <ThreeJsObject type="planet" />
      </div>
      
      <HeroSection />
      <FeaturedArticles />
      <LatestArticles />
      <SpotlightArticle />
      <CategoriesSection />
      <SubscribeSection />
    </main>
  );
};

export default Home;
