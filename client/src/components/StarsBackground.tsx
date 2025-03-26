import { useEffect, useRef } from 'react';
import { createStarsEffect } from '../lib/animations';

interface StarsBackgroundProps {
  starCount?: number;
}

const StarsBackground: React.FC<StarsBackgroundProps> = ({ starCount = 300 }) => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (starsContainerRef.current) {
      // Adjust star count based on screen size
      const adjustedStarCount = window.innerWidth < 768 ? Math.floor(starCount / 2) : starCount;
      
      // Create stars effect
      createStarsEffect(starsContainerRef.current, adjustedStarCount);
      
      // Re-create stars on window resize
      const handleResize = () => {
        if (starsContainerRef.current) {
          const newStarCount = window.innerWidth < 768 ? Math.floor(starCount / 2) : starCount;
          createStarsEffect(starsContainerRef.current, newStarCount);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [starCount]);
  
  return <div ref={starsContainerRef} className="stars-bg" id="stars-container"></div>;
};

export default StarsBackground;
