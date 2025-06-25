"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, isAuthChecked } = useAuth();

  return (
    <nav className="w-full border-b">
      <section className="container mx-auto p-4 w-full flex items-center justify-between">
        <div className="font-bold text-2xl">
          Opti<span className="text-primary">Chain</span>
        </div>
        {isAuthChecked && user && (
          <div className="flex gap-4">
            <div className="lg:flex hidden w-full max-w-sm items-center border border-gray-300 rounded-lg px-2.5">
              <SearchIcon className="h-4 w-4 mr-2.5" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full border-0 focus:outline-none focus:ring-0  focus-visible:border-0 focus-visible:ring-0"
              />
            </div>
            <Sidebar />
          </div>
        )}
      </section>
    </nav>
  );
}
