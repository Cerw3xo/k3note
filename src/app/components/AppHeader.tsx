"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaRegBell, FaCheck, FaSignOutAlt } from "react-icons/fa";

export default function AppHeader() {
  const [notificationState, setNotificationState] =
    useState<NotificationState>({
      problems: [
        {
          id: "1",
          machineId: "k3h3",
          machineName: "K3-h3",
          description: "Stacanie oprava toho a toho",
          shortDescription: "prestavba je to vyhadzané",
          createAt: "13.3",
          createdBy: "TEster1",
          solved: false,
        },
        {
          id: "2",
          machineId: "biw-2",
          machineName: "Biw2",
          description: " Stacanie oprava toho a toho",
          shortDescription: "najet po prestavbe",
          createAt: " 19.9.",
          createdBy: "TEster",
          solved: false,
        },
        {
          id: "3",
          machineId: "biw-3",
          machineName: "Biw3",
          description: " Stacanie oprava toho a toho",
          shortDescription: "doladit podavac",
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

  const handleSolveProblem = (problemId: string) => {
    setNotificationState((prev) => ({
      ...prev,
      problems: prev.problems.filter(
        (problem) => problem.id !== problemId
      ),
    }));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(event.target as Node)
      ) {
        setNotificationState((prev) => ({
          ...prev,
          isDropdownOpen: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  interface Problem {
    id: string;
    machineId: string;
    machineName: string;
    description: string;
    shortDescription: string;
    createdBy: string;
    createAt: string;
    solved: boolean;
  }

  interface NotificationState {
    problems: Problem[];
    isDropdownOpen: boolean;
  }

  return (
    <header className="flex items-center justify-between bg-white shadow-sm relative px-20 py-1 ">
      <Image
        className="w-auto"
        src="/image.png"
        width={170}
        height={100}
        alt="logo"
      />

      <div>
        <nav>
          <ul className="flex gap-x-6 text-md font-medium cursor-pointer">
            <li className="cursor-pointer">Dashboard</li>
            <li className="cursor-pointer">Nástenka</li>
            <li className="cursor-pointer">História</li>
          </ul>
        </nav>
      </div>

      <div className="flex  gap-x-7">
        <div className="relative inline-block cursor-pointer group">
          <div ref={bellRef}>
            {" "}
            <FaRegBell
              className="w-5 h-5 text-font-prim rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all
             duration-200"
              onClick={toggleDropDown}
            />
            {notificationState.problems.length > 0 && (
              <span
                onClick={toggleDropDown}
                className="bg-k3-red
               text-white text-[.6rem] 
               rounded-full
               flex items-center justify-center
               p-[.25rem]
               absolute
               min-w-[10px]
               min-h-[10px]
                top-3
                -right-1
                aspect-square
                "
              >
                {" "}
                {notificationState.problems.length > 99
                  ? "99+"
                  : notificationState.problems.length}
              </span>
            )}
          </div>

          {notificationState.isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 min-w-[27rem] h-max top-full p-[1rem] mt-[1.7rem] shadow-lg border border-gray-200 bg-white  "
            >
              <div className=" flex flex-col items-start justify-center space-y-2 ">
                <h3 className="text-[1.3rem] font-semibold mb-[.3rem]">
                  Nevyrešeno: {notificationState.problems.length}
                </h3>

                {notificationState.problems.map((problem) => (
                  <div key={problem.id} className="py-1 w-full">
                    <div className="flex items-center  w-[100%]">
                      <p className="text-font-sec px-1 flex-1 ">
                        {problem.machineName} :
                      </p>

                      <div className="flex w-[80%] justify-between items-center">
                        <p className="text-k3-blue">
                          {problem.shortDescription}
                        </p>
                        <FaCheck
                          onClick={() =>
                            handleSolveProblem(problem.id)
                          }
                          className="text-font-sec hover:text-k3-green transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <FaSignOutAlt className=" relative text-font-prim w-5 h-5 cursor-pointer hover:left-1 transition-all" />
        <p className="flex text-md font-medium ">Matej</p>
      </div>
    </header>
  );
}
