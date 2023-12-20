"use client";
import Link from "next/link";
import React, { use } from "react";
import { RiAncientGateFill } from "react-icons/ri";
import { useTranslation } from "../i18n/client";

export interface HeaderProps {
  params: {
    lng: string;
  };
}

const Header = (props: HeaderProps) => {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "Header");
  return (
    <nav className="flex flex-row w-full h-10 bg-blue-400 items-center text-white font-light px-4 z-10">
      <Link href={"/"} className="transition ease-in-out hover:font-bold">
        {" "}
        {t("Structurer")}
      </Link>
      <span className="flex-grow"></span>
      <div className="flex flex-row gap-4">
        <Link href={"/de"} className="transition ease-in-out hover:font-bold">
          🇩🇪 Deutsch
        </Link>
        <Link href={"/en"} className="transition ease-in-out hover:font-bold">
          🇬🇧 English
        </Link>
        <a href="https://healthnerd.solutions" target="_blank">
          <RiAncientGateFill size={32} style={{ color: "white" }} />
        </a>
      </div>
    </nav>
  );
};

export default Header;
