'use client';

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState<boolean>(true);
  const filters = ["All", "Active", "Inactive"];
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    const html = document.documentElement;
    if (dark){
      html.classList.add("dark");
    }else{
      html.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="h-screen bg-linear-to-b dark:from-[#040918] dark:to-[#091540] flex justify-center items-start">
      <div className="w-7/12 mt-8">
        <header className="flex justify-between dark:bg-[hsl(226,25%,17%)] p-3 rounded-xl">
          <Image 
            src="/assets/images/logo.svg"
            alt="Logo"
            width={160}
            height={160}
            
          />
          <button className="dark:bg-[hsl(225,23%,24%)] p-3 rounded-xl dark:hover:bg-[hsl(226,11%,37%)] transition">
            <Image 
              src="/assets/images/icon-sun.svg"
              alt="Sun"
              width={16}
              height={16}
            />
          </button>
        </header>
        <main className="mt-10">
          <div className="flex justify-between">
            <h1 className="text-2xl text-white font-bold">Extensions List</h1>
            <div className="flex justify-between gap-1">
              {filters.map((label: string, index: number) => (
                <label key={index} className="cursor-pointer">
                  <input
                    type="radio"
                    name="filter"
                    className="sr-only"
                    checked={selected === index}
                    onChange={() => setSelected(index)}
                  />
                  <span className={`
                      rounded-full py-1.5 px-3.5 text-white transition
                      ${selected === index
                        ? "bg-[hsl(3,71%,56%)] hover:bg-[hsl(3,86%,64%)]"
                        : "dark:hover:bg-[hsl(226,11%,37%)] dark:bg-[hsl(225,23%,24%)]"
                      }
                    `}
                  >
                   {label} 
                  </span>
                </label>
              ))}
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
