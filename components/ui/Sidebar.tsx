"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Box,
  ChartNoAxesCombined,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  SearchIcon,
  Settings,
  ShoppingCart,
  Sparkle,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const adminNav = [
  {
    id: "0",
    icon: <LayoutDashboard />,
    label: "Dashboard",
    link: "/dashboard",
  },
  { id: "1", icon: <Box />, label: "Inventory", link: "#" },
  { id: "2", icon: <ShoppingCart />, label: "Sales Orders", link: "#" },
  { id: "3", icon: <Truck />, label: "Supplies", link: "/supplies" },
  {
    id: "4",
    icon: <ChartNoAxesCombined />,
    label: "Reports",
    link: "/reports",
  },
  { id: "5", icon: <Sparkle />, label: "About Us", link: "#" },
];

const managerNav = [
  { id: "3", icon: <Truck />, label: "Supplies", link: "/supplies" },
  {
    id: "4",
    icon: <ChartNoAxesCombined />,
    label: "Reports",
    link: "/reports",
  },
];

export function Sidebar() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const navMenu = user?.role === "admin" ? adminNav : managerNav;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
        </SheetHeader>

        <div className="px-4">
          <p className="text-xs font-bold mb-3">GENERAL</p>
          <ul>
            {navMenu.map((item) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.id} className="w-full">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Link href={item.link} className="flex items-center">
                        <item.icon.type className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-4">
          <p className="text-xs font-bold mb-3">SUPPORT</p>
          <ul>
            <li className="w-full">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="#">
                  <Info />
                  Help
                </Link>
              </Button>
            </li>
            <li className="w-full">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="#">
                  <Settings />
                  Settings
                </Link>
              </Button>
            </li>
          </ul>
        </div>

        <div className="flex gap-1 px-4 lg:hidden">
          <div className="flex w-full max-w-sm items-center border border-gray-300 rounded-lg px-2.5">
            <SearchIcon className="h-4 w-4 mr-2.5" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full border-0 focus:outline-none focus:ring-0"
            />
          </div>
          <Button variant="default">Search</Button>
        </div>

        <SheetFooter>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut />
            Log out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
