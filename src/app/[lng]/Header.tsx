"use client";
import React, { use } from "react";
import { useTranslation } from "../i18n/client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export interface HeaderProps {
  params: {
    lng: string;
  };
}

const Header = (props: HeaderProps) => {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "Header");
  const { setTheme, theme } = useTheme();

  return (
    <nav className="flex flex-row top-0 fixed shrink-0 w-full h-12 bg-primary items-center px-4">
      <h1 className="text-primary-foreground">{t("APE Playground")}</h1>
      <div className="grow" />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </nav>
  );
};

export default Header;
