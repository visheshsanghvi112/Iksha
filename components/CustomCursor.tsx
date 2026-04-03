import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', () => setIsVisible(true));
      document.addEventListener('mouseleave', () => setIsVisible(false));
      
      const clickables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', () => setIsVisible(true));
      document.removeEventListener('mouseleave', () => setIsVisible(false));
      
      const clickables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', () => setIsHovering(true));
        el.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    // Re-attach listeners on DOM changes (simple implementation)
    const observer = new MutationObserver(addEventListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    addEventListeners();

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  if (typeof window === 'undefined' || window.innerWidth < 768) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
          isHovering ? 'w-16 h-16' : 'w-4 h-4'
        }`}
      />
    </div>
  );
};

export default CustomCursor;