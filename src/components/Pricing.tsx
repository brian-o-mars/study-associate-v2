import Link from "next/link";
import React from "react";

function Pricing() {
  return (

    <div id="pricing">
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-[#202942]">
              Redefining your Study Experience
            </h2>
            <p className="mb-5 font-light text-[#202942] sm:text-xl dark:text-[#202942]">
              Meet Study Associate™. Our platform uses AI to assist students in
              grasping concepts faster, summarizing lengthy documents, and
              providing interactive study sessions. We&apos;re transforming the
              way you study, ensuring effective learning and comprehension.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* <!-- Pricing Card --> */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-[#202942] bg-[#dfeff4] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-[#202942] dark:text-[#dfeff4]">
              <h3 className="mb-4 text-2xl font-semibold">Guest</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Perfect for a quick review of a topic or document. No Login
                required.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">FREE</span>
                {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Instant document summarization</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Receive key takeaways in bullet point format</span>
                </li>
                
              </ul>

              <a
                href=""
                className="text-[#dfeff4] bg-[#202942] hover:bg-[#6e82b4] hover:border-2  hover:border-[#849487] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-[#dfeff4]  dark:focus:ring-primary-900"
              >
                Upload now
              </a>
            </div>
            {/* <!-- Pricing Card --> */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-[#202942] bg-[#dfeff4] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-[#202942] dark:text-[#dfeff4]">
              <h3 className="mb-4 text-2xl font-semibold">Logged In</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Return to your documents, resume sessions, extra features.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">TBD</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Instant document summarization</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Receive key takeaways in bullet point format</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>30 questions per document/session</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Visual representation with a pictographic summary</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Save documents and resume sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Opportunity to share your uploaded documents with other
                    students and get premium free
                  </span>
                </li>
              </ul>
              <a
                href="/signup"
                className="text-[#dfeff4] bg-[#202942] hover:bg-[#6e82b4] hover:border-2  hover:border-[#849487] focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-[#dfeff4]  dark:focus:ring-primary-900"
              >
                Sign up/Log in
              </a>
            </div>
            {/* <!-- Pricing Card --> */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-[#202942] bg-[#dfeff4] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-[#202942] dark:text-[#dfeff4]">
              <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Even extra features to supercharge your study sessions
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">TBD</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {/* <!-- List --> */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Instant document summarization</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Receive key takeaways in bullet point format</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Unlimited questions per document/session</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Visual representation with a pictographic summary</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Save documents and resume sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Transform your uploaded content into a new, AI-crafted
                    document
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* <!-- Icon --> */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>Extra features coming soon...</span>
                </li>
              </ul>

              <a
                href="#"
                className="text-[#dfeff4] bg-[#202942] hover:bg-[#6e82b4] hover:border-2  hover:border-[#849487]  focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-[#dfeff4]  dark:focus:ring-primary-900"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
