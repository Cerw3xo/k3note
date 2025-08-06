"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegBell, FaCheck, FaSignOutAlt } from "react-icons/fa";
import { useCommentContext } from "../context/CommentContext";
import { useUserContext } from "../context/UserContext";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const { comments, markCommentAsSolved } = useCommentContext();
  const problemComments = comments.filter(
    (comment) => comment.shortDescription && !comment.solved
  );

  const { user, setUser } = useUserContext();

  const [dropdownOpen, setDropdownOpen] = useState(true);
  const pathname = usePathname();

  const toggleDropDown = () => {
    setDropdownOpen((prev) => !prev);
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
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between relative bg-white shadow-sm px-10 py-2 rounded-md">
      <div className="flex items-center">
        <Image
          className="w-auto relative top-[.1rem]"
          src="/k3.png"
          width={100}
          height={60}
          alt="logo"
        />
        <div className=" border-font-sec border-l-[1px] pl-7">
          <nav className=" text-font-sec">
            <ul className="flex gap-x-6 text-sm  cursor-pointer ">
              <Link
                href="/dashboard"
                className={`cursor-pointer
                  ${
                    pathname === "/dashboard"
                      ? "text-k3-blue"
                      : "text-font-sec"
                  }
                `}
              >
                Dashboard
              </Link>
              <Link
                href="/board"
                className={`
                  ${
                    pathname === "/board"
                      ? "text-k3-blue cursor-pointer"
                      : "text-font-sec"
                  }
                `}
              >
                Nástenka
              </Link>
              <Link
                href="/history"
                className={`
                  ${
                    pathname === "/history"
                      ? "text-k3-blue cursor-pointer"
                      : "text-font-sec"
                  }
                `}
              >
                História
              </Link>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex gap-x-5">
        <div className="relative flex items-center group">
          <div
            ref={bellRef}
            className="border-r-[1px] border-font-sec px-6"
          >
            {" "}
            <FaRegBell
              className="w-4 h-4 text-font-sec cursor-pointer group-hover:scale-110 transition-all  group-hover:rotate-12
             duration-200 "
              onClick={toggleDropDown}
            />
            {problemComments.length > 0 && (
              <span
                onClick={toggleDropDown}
                className="bg-white
                border-[.2rem] border-k3-blue
               rounded-full
               flex items-center justify-center
               absolute
               p-[.05rem]
               min-w-[2px]
               min-h-[2px]
                top-[.4rem]
                right-[1.55rem]
                aspect-square
                cursor-pointer
                "
              ></span>
            )}
          </div>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute -right-20 min-w-[25rem] h-max top-4 p-[1rem] mt-[1.7rem] shadow-md bg-white z-50 rounded-md "
            >
              <div className=" flex flex-col items-start justify-center space-y-1 ">
                <h3 className="text-4 text-font-prim font-base mb-[.3rem] border-b-2 border-k3-violet">
                  Nevyrešeno: {problemComments.length}
                </h3>

                {problemComments.map((problem) => (
                  <div key={problem.id} className="py-1 w-full">
                    <div className="flex items-center  w-[100%] border-b-[.1rem] border-k3-violet">
                      <p className="text-k3-blue px-1 flex-1 ">
                        {problem.machineName} :
                      </p>

                      <div className="flex w-[80%] justify-between items-center">
                        <p className="text-font-prim text-sm">
                          {problem.shortDescription}
                        </p>
                        <FaCheck
                          onClick={() =>
                            markCommentAsSolved(problem.id)
                          }
                          className="text-font-sec hover:text-k3-green transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button className="flex items-center gap-3 px-2 py-1">
          <p className="flex text-sm font-extra-light ">{user}</p>

          <FaSignOutAlt className=" relative text-font-prim w-3 h-3 cursor-pointer" />
        </button>
      </div>
    </header>
  );
}
