import Image from "next/image";

import Link from "next/link";

function Footer() {
  return (
    <footer className=" inset-x-0 bottom-0 flex flex-col ">
      <div className="flex flex-col md:flex-row space-x-5 mx-3 mt-3 p-2 items-center justify-between ">
        <Link href="/">
          {/* <Image
            src={logo}
            alt="Study Associate Logo"
            width={300}
            height={100}
            className="w-full md:w-56 items-center"
          /> */}
        </Link>

        <div className="w-full md:w-1/2 text-[#202942] font-medium text-md md:text-[17px] text-center ">
          <ul className="flex flex-col md:flex-row justify-between p-2">
            <li className="py-1">
              <Link href="/">Home</Link>
            </li>
            <li className="py-1">
              <Link href="/about">About Us</Link>
            </li>
            <li className="py-1">
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li className="py-1">
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="items-center justify-center text-center">
        <span className="block border-t-[1px] border-[#202942] text-sm text-[#202942] sm:text-center dark:text-[#202942] items-center w-[95%] mx-auto py-2">
          © 2023{" "}
          <a href="https://studyassociate.com/" className="hover:underline">
            Study Associate™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
