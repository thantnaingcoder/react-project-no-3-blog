import { useState } from "react";
import { motion } from "framer-motion";

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

const Toggle: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="p-2 bg-blue-500 text-white">
    Toggle Menu
  </button>
);

const Items: React.FC = () => (
  <ul className="p-4">
    <li className="mb-2">Item 1</li>
    <li className="mb-2">Item 2</li>
    <li className="mb-2">Item 3</li>
  </ul>
);

export const MyComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <motion.nav
        className="absolute top-0 left-0 w-64 h-full bg-gray-800 text-white"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        initial="closed"
        transition={{ duration: 0.5 }} // Adjusts the speed of the animation
      >
        <Items />
      </motion.nav>
      <div className="p-4">
        <Toggle onClick={() => setIsOpen((isOpen) => !isOpen)} />
      </div>
    </div>
  );
};

export default MyComponent;
