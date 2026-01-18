import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <div className="flex gap-5 smp-5 h-full xl:overflow-hidden">
      <div
        className="flex-1 hidden px-4 rounded-xl h-full bg-cover bg-center bg-no-repeat aspect-auto justify-start xl:flex flex-col items-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/pngs/auth-bg.png')",
        }}
      >
       
        <Image
          src={"/images/svgs/auth/auth.svg"}
          height={856}
          width={628}
          alt="silver spoon"
          className="h-full w-full object-contain scale-x-105"
        />
      </div>
      <div className="flex-1 h-full overflow-y-auto xl:min-h-0">{children}</div>
    </div>
  );
};

export default AuthLayout;
