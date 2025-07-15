"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegBell } from "react-icons/fa";

export default function AppHeader() {
  const [notificationCount, setNotificationCount] = useState(3);

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
            <li> Dashboard</li>
            <li> Nástenka</li>
            <li> História</li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-x-5">
        <p>Status</p>
        <FaRegBell className="w-4 h-4 text-k3-green" />
        <p className="text-k3-red">{notificationCount}</p>
      </div>

      <div>
        <p className="flex text-md font-medium">Matej</p>
      </div>
    </header>
  );
}
