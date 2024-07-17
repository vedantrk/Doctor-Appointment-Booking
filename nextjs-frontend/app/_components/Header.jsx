"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
  const { user } = useKindeBrowserClient();

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 1,
      name: "Explore",
      path: "/search/Cardiologist",
    },
    {
      id: 1,
      name: "Contact Us",
      path: "/",
    },
  ];

  useEffect(() => {}, [user]);

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Link href={"/"} className="">
          <Image
            src="/logo.svg"
            alt="logo"
            width={180}
            height={80}
            className="hover:cursor-pointer"
          />
        </Link>
        <ul className="hidden md:flex gap-8 ">
          {Menu.map((item, index) => (
            <Link key={index} href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2 ">
        <div className="md:hidden">
          <Link href={"/"}>
            <Image src={"/home.png"} alt="home-icon" width={27} height={27} />
          </Link>
        </div>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Image
                src={user?.picture}
                alt="profile-pic"
                width={40}
                height={40}
                className="rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <ul className="flex flex-col gap-1 ">
                <Link href={"/"}>
                  <li className="cursor-pointer p-1 rounded-md hover:bg-slate-100 md:hidden">
                    Contact Us
                  </li>
                </Link>
                <Link href={"/my-booking"}>
                  <li className="cursor-pointer p-1 rounded-md hover:bg-slate-100">
                    My Bookings
                  </li>
                </Link>
                <li className="cursor-pointer p-1 rounded-md hover:bg-slate-100">
                  <LogoutLink>
                    <li variant="outline">Log out</li>
                  </LogoutLink>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <LoginLink>
            <Button>Get Started</Button>
          </LoginLink>
        )}
      </div>
    </div>
  );
}

export default Header;
