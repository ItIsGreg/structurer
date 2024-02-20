"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface HeaderProps {
  params: {
    lng: string;
  };
}

const Header = (props: HeaderProps) => {
  const lng = props.params.lng;
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  return (
    <nav className="flex flex-row top-0 fixed shrink-0 w-full h-12 bg-primary items-center px-4">
      <h1 className="text-primary-foreground">{"APE Playground"}</h1>
      <div className="grow" />
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{"Language"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/de")}>
              {"German"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/en")}>
              {"English"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default Header;
