import * as React from "react";
import Image from "next/image";

export function Logo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
      <Image
        src="https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610980894_122094488553204574_1173630654904122105_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=w_JTA7IAUPAQ7kNvwEBcTN-&_nc_oc=AdmNVNNY7yAC4_MNsCIBG6f5B7ia0Y0hwwVjPBroSSRUyPcJUY8Ji3EBXwuNV3UGf-RWKDv8-EWKETnRZ6i3wNxk&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=-K63nDAQaxDlndwipXQweA&oh=00_AfoDETGKyDd6kFfO8r5Q2Estc8Q6O353Yri78v1hkcFNog&oe=695F36BB"
        alt="VivaFit Logo"
        width={150}
        height={40}
        className="w-full h-full object-contain"
        unoptimized
      />
    </div>
  );
}
