"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Client-side pathname hook

export default function HomePageScript() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      // Dynamically inject the Tawk.to script
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/6744769a2480f5b4f5a39633/1idhmujei";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isHomePage]);

  return null; 
}
