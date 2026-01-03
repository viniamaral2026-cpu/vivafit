import * as React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Image
        src="https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=PCg1f1GLhWjb7qWO_hgemA&oh=00_AfqCpYQG4SeSckTh3mcE9f4PeHYYKV_mZ5YKBMlrTCu6Ag&oe=695ED3E7"
        alt="VivaFit Logo"
        width={250}
        height={100}
        className="w-full h-auto object-contain"
        unoptimized
      />
    </div>
  );
}
