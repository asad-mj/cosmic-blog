import { useEffect, useRef } from 'react';
import { PlanetScene, SpaceshipScene, RoverScene, ThreeScene } from '../lib/three-scene';

type SceneType = 'planet' | 'spaceship' | 'rover';

interface ThreeJsObjectProps {
  type: SceneType;
  className?: string;
}

const ThreeJsObject: React.FC<ThreeJsObjectProps> = ({ type, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clean up previous scene if exists
    if (sceneRef.current) {
      sceneRef.current.dispose();
      sceneRef.current = null;
    }
    
    // Create the appropriate scene based on type
    switch (type) {
      case 'planet':
        sceneRef.current = new PlanetScene(containerRef.current);
        break;
      case 'spaceship':
        sceneRef.current = new SpaceshipScene(containerRef.current);
        break;
      case 'rover':
        sceneRef.current = new RoverScene(containerRef.current);
        break;
      default:
        sceneRef.current = new PlanetScene(containerRef.current);
    }
    
    // Start animation
    sceneRef.current.start();
    
    // Clean up on unmount
    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, [type]);
  
  return <div ref={containerRef} className={`three-container ${className}`}></div>;
};

export default ThreeJsObject;
