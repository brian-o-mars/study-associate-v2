import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Guest from "./Guest";


const page = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300">
      <Header />
      <Guest />
      <Footer />
    </div>
  );
};

export default page;
