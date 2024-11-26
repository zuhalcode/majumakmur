import React from "react";
import HeaderAuth from "./header-auth";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex bg-zinc-900 justify-center items-center border-b border-b-foreground/10">
        <div className="w-full flex justify-between xl:justify-end items-center px-3 py-2 text-sm">
          <HeaderAuth />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
