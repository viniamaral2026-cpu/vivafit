import * as React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Image
        src="https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/611147366_122094480705204574_1697207361115252820_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=b8278c&_nc_ohc=YPFSw8Ff4SMQ7kNvwETveXy&_nc_oc=Adkrxe-9GvEtKmMrZ9ZNbeEjXf1Aor4Vv38XcF7ddbnAk8E-nh4Yqdgx2PFavNJUjuQmOjyQAVvp_nENs76B8CwA&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=bMIOpDWjQAXaRGn-9H1r3w&oh=00_AfrhgiuLN8CaBqMw4yxt7AJKHWTbgdbYBLCduZ7sCz6OJw&oe=695F18F3"
        alt="VivaFit Logo"
        width={150}
        height={40}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  );
}
