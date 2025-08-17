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
    <header className="flex items-center justify-between relative bg-surface/95 backdrop-blur-sm shadow-lg border border-primary/10 px-10 py-3 rounded-xl">
      <div className="flex items-center">
        <h1 className="text-onPrimary mr-3 font-bold text-xl tracking-tight">
          K3note
        </h1>
        <div className="border-onSurface/20 border-l-[1px] pl-7">
          <nav>
            <ul className="flex gap-x-8 text-sm cursor-pointer">
              <Link
                href="/dashboard"
                className={`cursor-pointer rounded-md p-1 transition-all duration-200 hover:text-onPrimary hover:scale-105 ${
                  pathname === "/dashboard"
                    ? "text-onPrimary font-medium"
                    : "text-onPrimary/60 hover:text-onPrimary/80"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/board"
                className={`transition-all rounded-md p-1 duration-200 hover:text-onPrimary hover:scale-105 ${
                  pathname === "/board"
                    ? "text-onPrimary font-medium"
                    : "text-onPrimary/60 hover:text-onPrimary/80"
                }`}
              >
                Nástenka
              </Link>
              <Link
                href="/history"
                className={`transition-all rounded-md p-1 duration-200 hover:text-onPrimary hover:scale-105 ${
                  pathname === "/history"
                    ? "text-onPrimary font-medium"
                    : "text-onPrimary/60 hover:text-onPrimary/80"
                }`}
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
            className="border-r-[1px] border-onSurface/20 px-6"
          >
            <FaRegBell
              className="w-5 h-5 text-onPrimary cursor-pointer group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 hover:text-primary"
              onClick={toggleDropDown}
            />
            {problemComments.length > 0 && (
              <span
                onClick={toggleDropDown}
                className="bg-red-500 border-2 border-surface rounded-full flex items-center justify-center absolute p-1 min-w-[8px] min-h-[8px] top-0 right-[1.2rem] aspect-square cursor-pointer animate-pulse"
              ></span>
            )}
          </div>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute -right-20 min-w-[25rem] h-max top-4 p-4 mt-[1.7rem] shadow-2xl bg-surface/95 backdrop-blur-sm z-50 rounded-xl border border-primary/20 animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex flex-col items-start justify-center space-y-2">
                <h3 className="text-lg text-onPrimary font-semibold mb-3 border-b-2 border-primary/30 pb-2 w-full">
                  Nevyrešeno: {problemComments.length}
                </h3>

                {problemComments.map((problem) => (
                  <div
                    key={problem.id}
                    className="py-2 w-full hover:bg-background/50 rounded-lg px-2 transition-colors duration-200"
                  >
                    <div className="flex items-center w-[100%] border-b-[.1rem] border-surface pb-2">
                      <p className="px-1 flex-1 font-medium text-onPrimary">
                        {problem.machineName}:
                      </p>

                      <div className="flex w-[80%] justify-between items-center">
                        <p className="text-sm text-onSurface/80">
                          {problem.shortDescription}
                        </p>
                        <FaCheck
                          onClick={() =>
                            markCommentAsSolved(problem.id)
                          }
                          className="text-onSurface/70 hover:text-green-400 hover:scale-110 transition-all duration-200 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 rounded-lg transition-all duration-200 group">
          <p className="text-sm font-medium text-onPrimary">{user}</p>
          <FaSignOutAlt className="w-4 h-4 text-onSurface/70 group-hover:text-red-400 group-hover:scale-110 transition-all duration-200 cursor-pointer" />
        </button>
      </div>
    </header>
  );
}
