
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";


export function BackgroundGradientDemo({children}: {children: React.ReactNode}) {
  return (
    
      <BackgroundGradient >
        
         {children}
      </BackgroundGradient>
    
  );
}
