"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSIdebar } from "./nav-sidebar";  
import { Ghost, MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

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
        "bg-transparent hover:bg-white hover:text-black border-white hover:border-white rounded-none px-6 text-lg font-medium transition-all duration-200 text-white",
        isActive && "bg-white text-black border-white"
      )}
    >
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
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());
  const pathname = usePathname();
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  
  const signInChild = (
    <Link prefetch href="/sign-in">
      <span>SignIn</span>
    </Link>
  ); 

  const signUpChild = (
    <Link prefetch href="/sign-up">
      <span>SignUp</span>
    </Link>
  );

  return (
    <nav className="h-20 flex border-b-2 border-white justify-between font-medium bg-black">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-4xl font-black text-white uppercase tracking-tight", poppins.className)}>
          UrbanVault
        </span>
      </Link>

      <NavbarSIdebar open={isSidebarOpen} onOpenChange={setIsSideBarOpen} items={navbarItems} />
      
      <div className="items-center gap-2 hidden lg:flex">
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

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="border-l-2 border-white border-t-0 border-b-0 border-r-0 px-8 h-full rounded-none bg-black text-white hover:bg-white hover:text-black transition-all duration-200 text-lg font-medium"
          >
            <Link href="/admin">
              Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="ghost"
            className="border-l-2 border-white border-t-0 border-b-0 border-r-0 px-8 h-full rounded-none bg-black text-white hover:bg-white hover:text-black transition-all duration-200 text-lg font-medium"
          >
            {signInChild}
          </Button>

          <Button
            asChild
            className="border-l-2 border-white border-t-0 border-b-0 border-r-0 px-8 h-full rounded-none bg-black text-white hover:bg-white hover:text-black transition-all duration-200 text-lg font-medium"
          >
            {signUpChild}
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center justify-center pr-4">
        <Button 
          variant="ghost" 
          className="size-12 border-2 border-white bg-black hover:bg-white hover:text-black transition-all duration-200 text-white"
          onClick={() => setIsSideBarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;