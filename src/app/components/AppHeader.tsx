"use client";

import Image from "next/image";
import { useState } from "react";
import { FaRegBell } from "react-icons/fa";

export default function AppHeader() {
  const [notificationState, setNotificationState] =
    useState<NotificationState>({
      problems: [
        {
          id: "biw-1",
          machineId: "b1",
          machineName: "Biw",
          description: " Stacanie oprava toho a toho",
          createAt: " 13.3",
          createdBy: "TEster1",
          solved: false,
        },
        {
          id: "biw-2",
          machineId: "b1",
          machineName: "Biw",
          description: " Stacanie oprava toho a toho",
          createAt: " 19.9.",
          createdBy: "TEster",
          solved: false,
        },
        {
          id: "biw-3",
          machineId: "b1",
          machineName: "Biw",
          description: " Stacanie oprava toho a toho",
          createAt: " 19.9.",
          createdBy: "TEster",
          solved: false,
        },
      ],
      isDropdownOpen: false,
    });

  const toggleDropDown = () => {
    setNotificationState((prev) => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen,
    }));
  };

  interface Problem {
    id: string;
    machineId: string;
    machineName: string;
    description: string;
    createdBy: string;
    createAt: string;
    solved: boolean;
  }

  interface NotificationState {
    problems: Problem[];
    isDropdownOpen: boolean;
  }

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
          <FaRegBell
            className="w-6 h-6 text-font-prim rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all
             duration-200"
            onClick={toggleDropDown}
          />

          {notificationState.problems.length > 0 && (
            <span
              className="bg-k3-red
               text-white text-xs 
               rounded-full
               flex items-center justify-center
               p-1
               absolute
                top-3
                -right-1
                min-w-[15px]
                min-h-[15px]
                aspect-square
                "
            >
              {" "}
              {notificationState.problems.length > 99
                ? "99+"
                : notificationState.problems.length}
            </span>
          )}

          {notificationState.isDropdownOpen && (
            <div className="absolute">
              <div className="">
                <h3>
                  Nevyrešeno({notificationState.problems.length})
                </h3>

                {notificationState.problems.map((problem) => (
                  <div key={problem.id}>
                    <p>{problem.machineName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="flex text-md font-medium ">Matej</p>
      </div>
    </header>
  );
}
