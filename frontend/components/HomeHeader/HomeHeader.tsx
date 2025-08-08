import Image from "next/image";

import AuthButton from "@/components/HomeHeader/AuthButton";
import logo from "@/public/assets/logo.png";

export default function HomeHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white flex justify-between h-[96px] items-center px-20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        <Image
          src={logo}
          alt="logo"
          width={logo.width}
          height={logo.height}
          className="block"
        />
        <div className="flex items-center gap-4">
          <a className="font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#cc6200]">
            Pixelo Sites
          </a>
          <a className="font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#cc6200]">
            How it Works
          </a>
          <a className="font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#cc6200]">
            Features
          </a>
        </div>
        <div className="flex items-center gap-4">
          <AuthButton variant="login">Login</AuthButton>
          <AuthButton variant="register">Register</AuthButton>
        </div>
      </header>
    </>
  );
}
