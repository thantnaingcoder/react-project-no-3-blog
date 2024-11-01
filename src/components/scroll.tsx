import React, { useEffect, useState } from "react";


const ScrollNav = ({ children }: { children: React.ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Show the navbar if scrolling up, hide it if scrolling down
      setIsVisible(scrollPosition > currentScrollPos || currentScrollPos < 10);

      // Update the scroll position
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div
      className={`fixed top-0 w-full  transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
        {children}
    </div>
  );
};

export default ScrollNav;