"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegBell, FaCheck, FaSignOutAlt } from "react-icons/fa";
import { useCommentContext } from "../context/CommentContext";
import { useUserContext } from "../context/UserContext";

export default function AppHeader() {
  const { comments, markCommentAsSolved } = useCommentContext();
  const problemComments = comments.filter(
    (comment) => comment.shortDescription && !comment.solved
  );

  const { user, setUser } = useUserContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <header className="flex items-center justify-between bg-white shadow-sm relative px-20 py-3 ">
      <Image
        className="w-auto"
        src="/image.png"
        width={170}
        height={100}
        alt="logo"
      />
      <div>
        <nav>
          <ul className="flex gap-x-6 text-sm  cursor-pointer">
            <Link href="/dashboard" className="cursor-pointer">
              Dashboard
            </Link>
            <Link href="/board" className="cursor-pointer">
              Nástenka
            </Link>
            <Link href="/history" className="cursor-pointer">
              História
            </Link>
          </ul>
        </nav>
      </div>

      <div className="flex gap-x-8">
        <div className="relative flex items-center cursor-pointer group">
          <div ref={bellRef}>
            {" "}
            <FaRegBell
              className="w-4 h-5 text-font-prim rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all
             duration-200 "
              onClick={toggleDropDown}
            />
            {problemComments.length > 0 && (
              <span
                onClick={toggleDropDown}
                className="bg-k3-red
               rounded-full
               flex items-center justify-center
               p-1
               absolute
               min-w-[7px]
               min-h-[7px]
                top-4
                -right-0
                aspect-square
                "
              ></span>
            )}
          </div>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 min-w-[27rem] h-max top-full p-[1rem] mt-[1.7rem] shadow-lg border border-gray-200 bg-white  "
            >
              <div className=" flex flex-col items-start justify-center space-y-2 ">
                <h3 className="text-[1.3rem] font-semibold mb-[.3rem]">
                  Nevyrešeno: {problemComments.length}
                </h3>

                {problemComments.map((problem) => (
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
                            markCommentAsSolved(problem.id)
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
        <button className="flex items-center gap-2 px-2 py-1 rounded-md border border-FONT-SEC">
          <p className="flex text-sm font-sm ">{user}</p>

          <FaSignOutAlt className=" relative text-font-prim w-4 h-4 cursor-pointer" />
        </button>
      </div>
    </header>
  );
}
