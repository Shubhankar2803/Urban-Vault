"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSIdebar } from "./nav-sidebar";  
import { Ghost, MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"

      className={cn(
        "bg-transparent hover:bg-purple-400 rounded-full hover:border-primary border-transparent px-5 text-lg",
        isActive && "bg-purple-400 text-white hover:bg-purple-300 hover:text-white"
      )}
    >
      {/* Wrap children in a single <span> to ensure a single element */}
      <Link href={href}>
        <span>{children}</span>
      </Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
 const  [isSidebarOpen,setIsSideBarOpen]= useState(true)
  const signInChild = (
    <Link href="/sign-in">
      <span>Login</span>
    </Link>
  );

  const signUpChild = (
    <Link href="/sign-up">
      <span>Startselling</span>
    </Link>
  );

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-purple-200">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          UrbanVault
        </span>
      </Link>
<NavbarSIdebar open={isSidebarOpen} onOpenChange={setIsSideBarOpen} items={navbarItems} />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-purple-200 hover:bg-purple-300 transition-colors text-lg"
        >
          {signInChild}
        </Button>

        <Button
          asChild
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-purple-200 text-black hover:bg-purple-300 hover:text-black transition-colors text-lg"
        >
          {signUpChild}
        </Button>
      </div>
      <div className="flex lg:hidden items-center justify-center">

        <Button variant="ghost" className="size-12 border-transparent bg-white"
         onClick={()=>setIsSideBarOpen(true)} >

          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
