

import { BackgroundBeams } from "./ui/background-beams";

export function BackgroundBeamsDemo({children}: {children: React.ReactNode}) {
  return (
    <div  className="h-[40rem] w-full rounded-md z-0 relative flex flex-col items-center justify-center antialiased">

    {children}

      <BackgroundBeams />
    </div>
  );
}
