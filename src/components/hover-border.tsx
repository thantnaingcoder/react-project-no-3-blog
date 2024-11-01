
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function HoverBorderGradientDemo({children}: {children: React.ReactNode}) {
  return (
    // <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-md"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center "
      >
        {/* <AceternityLogo /> */}
       
       {children}
      </HoverBorderGradient>
    // </div>
  );
}

// const AceternityLogo = () => {
//   return (
//     <svg
//       width="66"
//       height="65"
//       viewBox="0 0 66 65"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-3 w-3 text-black dark:text-white"
//     >
//       <path
//         d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
//         stroke="currentColor"
//         strokeWidth="15"
//         strokeMiterlimit="3.86874"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };