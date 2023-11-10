import Link from "next/link";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiAncientGateFill } from "react-icons/ri";

const Header = () => {
  return (
    <nav className="flex flex-row w-full h-10 bg-blue-400 items-center text-white font-light px-4 z-10">
      <Link href={"/"} className="transition ease-in-out hover:font-bold">
        {" "}
        Structurer
      </Link>
      <span className="flex-grow"></span>
      <div className="flex flex-row gap-4">
        <a href="https://healthnerd.solutions" target="_blank">
          <RiAncientGateFill size={32} style={{ color: "white" }} />
        </a>
      </div>
    </nav>
  );
};

export default Header;
