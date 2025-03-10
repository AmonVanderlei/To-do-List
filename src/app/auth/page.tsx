"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { LiaInfoSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

export default function Auth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within a AuthContextProvider");
  }
  const { googleLoginHandler, user, loading } = authContext;

  const router = useRouter();

  async function handleLogin() {
    const id = await googleLoginHandler();
    if (id) {
      router.push("/");
    } else {
      toast.error("Try again! Something wrong happened while logging in.");
    }
  }

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [loading, user, router]);

  return (
    <div className="grow flex flex-col items-center justify-between h-[80vh]">
      <div className="flex flex-col items-center w-11/12 gap-16 mt-20">
        <Image
          src="/icons/android-chrome-512x512.png"
          alt="Logo"
          width={512}
          height={512}
          className="max-w-40 rounded-full"
        />
        <div>
          <h1 className="text-2xl">Habit Maker</h1>
          <p className="text-sm text-slate-400">
            Write your goals to create new habits.
          </p>
        </div>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-2 rounded-lg bg-white py-2 w-full"
        >
          <FcGoogle className="text-2xl" />
          <p className="text-lg text-black">Sign In with Google</p>
        </button>
      </div>

      {/* Credits */}
      <div className="flex flex-col w-11/12 text-sm">
        <a
          href="https://github.com/AmonVanderlei/habit-maker"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1"
        >
          <LiaInfoSolid className="text-2xl" /> Learn more about the project
        </a>
        <div className="flex justify-end w-full underline">
          <a
            href="https://github.com/AmonVanderlei"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Amon Vanderlei
          </a>
        </div>
      </div>
    </div>
  );
}
