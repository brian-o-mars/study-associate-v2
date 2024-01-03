import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Userchat from "./UserChat";
// import HeroUser from "./HeroUser";


const page = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300">
      <Header />
      <Userchat />
      <Footer />
    </div>
  );
};

export default page;
