"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegBell } from "react-icons/fa";

export default function AppHeader() {
  const [notificationCount, setNotificationCount] = useState(2);

  return (
    <header className="bg-white shadow-lg px-20 py-3 flex items-center justify-between">
      <Image
        src="/images/image.png"
        width={170}
        height={100}
        alt="logo"
      />

      <div>
        <nav>
          <ul className="flex gap-x-6 text-md font-medium">
            <li>Dashboard</li>
            <li>Nástenka</li>
            <li>História</li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-x-10">
        <div className="relative inline-block cursor-pointer group">
          <FaRegBell className="w-6 h-6 text-k3-blue rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-200 " />

          {notificationCount > 0 && (
            <span
              className="bg-k3-red
               text-white text-xs
               rounded-full
               flex items-center justify-center
               px-1
               absolute
                top-3
                -right-1
                min-w-[10px]
                min-h-[10px]
                "
            >
              {" "}
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </div>
        <p className="flex text-md font-medium ">Matej</p>
      </div>
    </header>
  );
}
