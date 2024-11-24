import React from "react";
import HeaderAuth from "./header-auth";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex bg-zinc-900 justify-center items-center border-b border-b-foreground/10 ">
        <div className="w-full flex justify-between items-center px-3 py-2 text-sm">
          <HeaderAuth />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
