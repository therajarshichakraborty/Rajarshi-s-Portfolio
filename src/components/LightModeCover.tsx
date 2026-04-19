"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LightModeCover() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (resolvedTheme === "dark") return null;

  return (
    <div className="w-full -mt-6 mb-8 dark:hidden flex items-center justify-center">
      <div
        className="
          w-3xl h-[200px] sm:h-[200px] md:h-[250px]
          rounded-2xl overflow-hidden
          bg-cover bg-center
          relative
        "
        style={{
        backgroundImage: "url('/background/bg-light.jpg')",
        
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        {/* <div className="absolute inset-0 flex items-center justify-center px-4">
          <p className="text-black text-center text-lg sm:text-xl md:text-2xl italic font-bold">
            You either die a hero, or you live long enough to see yourself become the villain.
          </p>
        </div> */}
      </div>
    </div>
  );
}
