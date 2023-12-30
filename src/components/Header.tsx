import Image from "next/image";
import Link from "next/link";
import logo from "./logologo.png";

function Header() {
  return (
    <header>
      <div className="flex space-x-5 mb-3 py-2 px-3 items-center justify-between shadow-lg">
        <Link href="/">
          <Image
            src={logo}
            alt="Study Associate Logo"
            width={300}
            height={100}
            className="w-44 md:w-56 items-center"
          />
        </Link>
        <Link href="/#pricing">
          <button
            className="rounded-full bg-[#202942] text-[#dfeff4] 
           hover:bg-[#3a435e]
         font-bold py-2 px-3"
          >
            Get Started
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
