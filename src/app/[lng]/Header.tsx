"use client";
import Link from "next/link";
import React, { use } from "react";
import { RiAncientGateFill } from "react-icons/ri";
import { useTranslation } from "../i18n/client";
import { Button } from "@/components/ui/button";

export interface HeaderProps {
  params: {
    lng: string;
  };
}

const Header = (props: HeaderProps) => {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "Header");
  return (
    <nav className="flex flex-row w-full h-10 bg-primary items-center px-4 z-10">
      <Button variant="link" className="text-primary-foreground">
        <Link href={"/"} legacyBehavior passHref>
          {"Structurer"}
        </Link>
      </Button>
      <span className="flex-grow"></span>
      <div className="flex items-center flex-row gap-4">
        <Button variant="link" className="text-primary-foreground">
          <Link href={"/de"}>🇩🇪 Deutsch</Link>
        </Button>
        <Button variant="link" className="text-primary-foreground">
          <Link href={"/en"}>🇬🇧 English</Link>
        </Button>
        <Button variant="link" className="text-primary-foreground">
          <RiAncientGateFill size={32} style={{ color: "white" }} />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
