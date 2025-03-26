import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize the animated background effect that responds to scrolling
export const initScrollAnimations = () => {
  // Animate navbar background on scroll
  gsap.to('header', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: '50 top',
      scrub: true,
    },
    backgroundColor: 'rgba(18, 18, 37, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(53, 53, 80, 0.5)',
  });
  
  // Parallax effect for stars background
  const starsElements = document.querySelectorAll('.star');
  starsElements.forEach((star, index) => {
    gsap.to(star, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      y: (index % 3 + 1) * 100,
      ease: 'none',
    });
  });
  
  // Fade in elements as they come into view
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  });
  
  // Scale up card elements on scroll
  const cardElements = document.querySelectorAll('.card-holographic');
  cardElements.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0.5, y: 30, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }
    );
  });
  
  // Background color shift on scroll for specific sections
  gsap.to('.spotlight-section', {
    scrollTrigger: {
      trigger: '.spotlight-section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    },
    backgroundColor: 'rgba(69, 43, 106, 0.1)',
    ease: 'sine.inOut',
  });
  
  gsap.to('.subscribe-section', {
    scrollTrigger: {
      trigger: '.subscribe-section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    },
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    ease: 'sine.inOut',
  });
};

// Create twinkling star animation effect
export const createStarsEffect = (container: HTMLElement, starCount: number = 100) => {
  // Clean existing stars
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create new stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random size between 1px and 3px
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    // Random animation delay
    star.style.animationDelay = `${Math.random() * 4}s`;
    
    container.appendChild(star);
  }
  
  // Add meteors
  for (let i = 0; i < 5; i++) {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    // Random position and animation delay
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    meteor.style.left = `${x}%`;
    meteor.style.top = `${y}%`;
    meteor.style.animationDelay = `${Math.random() * 15}s`;
    meteor.style.animationDuration = `${Math.random() * 3 + 3}s`;
    
    container.appendChild(meteor);
  }
};

// Button hover animation
export const buttonHoverAnimation = (button: HTMLElement) => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in',
    });
  });
};

// Element float animation
export const floatAnimation = (element: HTMLElement, intensity: number = 1) => {
  gsap.to(element, {
    y: `-=${10 * intensity}`,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

// Animate content cards when they enter the viewport
export const animateCards = () => {
  const cards = document.querySelectorAll('.card-holographic');
  
  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { 
        opacity: 0,
        y: 30,
      },
      {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      }
    );
  });
};
