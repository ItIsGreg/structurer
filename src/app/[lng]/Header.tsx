"use client";
import Link from "next/link";
import React, { use } from "react";
import { RiAncientGateFill } from "react-icons/ri";
import { useTranslation } from "../i18n/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface HeaderProps {
  params: {
    lng: string;
  };
}

const Header = (props: HeaderProps) => {
  const lng = props.params.lng;
  const { t } = useTranslation(lng, "Header");
  return (
    <nav className="flex flex-row fixed shrink-0 w-full h-16 bg-primary items-center px-4">
      <h1 className="text-primary-foreground">{t("APE Playground")}</h1>
      <div className="grow" />
      <Select>
        <SelectTrigger className="w-64">
          <SelectValue placeholder={t("Load an example text...")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Example 1</SelectItem>
          <SelectItem value="2">Example 2</SelectItem>
          <SelectItem value="3">Example 3</SelectItem>
        </SelectContent>
      </Select>
    </nav>
  );
};

export default Header;
