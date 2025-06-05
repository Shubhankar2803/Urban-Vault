import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSIdebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transform-none bg-black border-r-4 border-white">
        <SheetHeader className="p-6 border-b-2 border-white">
          <div className="flex items-center">
            <SheetTitle className="text-2xl font-black text-white uppercase tracking-tight">
              UrbanVault
            </SheetTitle>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {/* Navigation Items */}
          <div className="py-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full text-left px-6 py-4 hover:bg-white hover:text-black flex items-center text-lg font-medium text-white border-b border-gray-800 transition-all duration-200 uppercase tracking-wide"
                onClick={() => onOpenChange(false)}
              >
                {item.children}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="border-t-2 border-white mt-auto">
            <Link
              onClick={() => onOpenChange(false)}
              href="/sign-in"
              className="w-full text-left px-6 py-4 hover:bg-white hover:text-black flex items-center text-lg font-medium text-white border-b border-gray-800 transition-all duration-200 uppercase tracking-wide"
            >
              Sign In
            </Link>
            <Link
              onClick={() => onOpenChange(false)}
              href="/sign-up"
              className="w-full text-left px-6 py-4 bg-white text-black hover:bg-gray-200 flex items-center text-lg font-bold transition-all duration-200 uppercase tracking-wide"
            >
              Sign Up
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};