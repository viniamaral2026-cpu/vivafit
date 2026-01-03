import * as React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Vivafit_logo.png"
        alt="VivaFit Logo"
        width={150}
        height={40}
        className="w-full h-auto object-contain"
        unoptimized
      />
    </div>
  );
}
