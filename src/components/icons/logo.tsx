import * as React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Image
        src="https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=fGu3FmTJ6PTnlOnKz4MMcA&oh=00_AfqIxwQ4H0vZZtOPKbDOaeFj_QLv4IQm1uZUnSmHln7pyw&oe=695F4467"
        alt="VivaFit Logo"
        width={150}
        height={40}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  );
}
