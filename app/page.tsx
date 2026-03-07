'use client';

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

interface ExtensionObject {
  title: string,
  description: string,
  iconfile: string,
  enabled: boolean
}

export default function Home() {
  const [dark, setDark] = useState<boolean>(true);
  const filters: string[] = ["All", "Active", "Inactive"];
  const [selected, setSelected] = useState<number>(0);

  const [extensions, setExtensions] = useState<ExtensionObject[]>([
    {title: "DevLens", description: "Quickly inspect page layouts and visualize element boundaries.", iconfile: "logo-devlens.svg", enabled: false},
    {title: "StyleSpy", description: "Instantly analyze and copy CSS from any webpage element.", iconfile: "logo-style-spy.svg", enabled: false},
    {title: "SpeedBoost", description: "Optimizes browser resource usage to accelerate page loading.", iconfile: "logo-speed-boost.svg", enabled: false},
    {title: "JSONWizard", description: "Formats, validates, and prettifies JSON responses in-browser.", iconfile: "logo-json-wizard.svg", enabled: false},
    {title: "TabMaster Pro", description: "Organizes browser tabs into groups and sessions.", iconfile: "logo-tab-master-pro.svg", enabled: false},
    {title: "ViewportBuddy", description: "Simulates various screen resolutions directly within the browser.", iconfile: "logo-viewport-buddy.svg", enabled: false},
    {title: "Markup Notes", description: "Enables annotation and notes directly onto webpages for collaborative debugging.", iconfile: "logo-markup-notes.svg", enabled: false},
    {title: "GridGuides", description: "Overlay customizable grids and alignment guides on any webpage.", iconfile: "logo-grid-guides.svg", enabled: false},
    {title: "Pallete Picker", description: "Instantly extracts color palettes from any webpage.", iconfile: "logo-palette-picker.svg", enabled: false},
    {title: "LinkChecker", description: "Scans and highlights broken links on any webpage.", iconfile: "logo-link-checker.svg", enabled: false},
    {title: "DOM Snapshot", description: "Capture and export DOM structures quickly.", iconfile: "logo-dom-snapshot.svg", enabled: false},
    {title: "ConsolePlus", description: "Enhanced developer console with advanced filtering and logging.", iconfile: "logo-console-plus.svg", enabled: false},
  ])

  const [filteredExtensions, setFilteredExtensions] = useState<ExtensionObject[]>(extensions)

  const removeExtension = (index: number) => {
    setExtensions(extensions.filter((object: ExtensionObject, i: number) => i !== index))
  }

  useEffect(() => {
    if(selected === 0){
      setFilteredExtensions(extensions);
    }else if(selected == 1){
      setFilteredExtensions(extensions.filter((object) => object.enabled === true))
    }else{
      setFilteredExtensions(extensions.filter((object) => object.enabled === false))
    }
  }, [selected, extensions])
  useEffect(() => {
    const html = document.documentElement;
    if (dark){
      html.classList.add("dark");
    }else{
      html.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="h-screen bg-linear-to-b dark:from-[#040918] dark:to-[#091540] from-[#EBF2FC] to-[#EEF8F9] flex justify-center items-start overflow-scroll">
      <div className="w-full lg:w-9/12 lg:mx-0 xl:w-7/12 mx-4 mt-8">
        <header className="flex justify-between dark:bg-[hsl(226,25%,17%)] p-3 rounded-xl">
          <Image 
            src="/assets/images/logo.svg"
            alt="Logo"
            width={160}
            height={160}
            
          />
          <button className="dark:bg-[hsl(225,23%,24%)] p-3 rounded-xl dark:hover:bg-[hsl(226,11%,37%)] transition" onClick={() => setDark(!dark)}>
            <Image 
              src={`/assets/images/icon-${dark ? "sun" : "moon"}.svg`}
              alt="Toggle"
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
                      rounded-full py-1.5 px-3.5 transition
                      ${selected === index
                        ? "bg-[hsl(3,77%,44%)] hover:bg-[hsl(3,71%,56%)] text-white dark:text-black"
                        : "dark:hover:bg-[hsl(226,11%,37%)] dark:bg-[hsl(225,23%,24%)] dark:text-white"
                      }
                    `}
                  >
                   {label} 
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 mt-4">
            {filteredExtensions.map((object: ExtensionObject, index: number) => {
              return (
                <div key={index} className="w-full p-4 dark:bg-[hsl(226,25%,17%)] rounded-2xl flex flex-col gap-6 border dark:border-0">
                  <div className="flex items-start gap-3 h-20">
                    <Image
                      src={`/assets/images/${object.iconfile}`}
                      alt="icon"
                      width={48}
                      height={48}
                    />
                    <div className="flex flex-col">
                      <h2 className="dark:text-white text-lg font-bold">{object.title}</h2>
                      <p className="text-slate-400 text-sm">{object.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button className="px-3 py-1 rounded-full border-[0.1px] border-slate-500 text-sm dark:text-white hover:bg-[hsl(3,86%,64%)] dark:hover:text-black hover:text-white transition" onClick={() => removeExtension(index)}>Remove</button>
                    <label className="relative inline-block w-14 h-7">
                      <input 
                        type="checkbox"
                        className="sr-only peer"
                        checked={object.enabled}
                        onChange={(e) => {
                          setExtensions(prevExtensions =>
                            prevExtensions.map((ext, i) =>
                              i === index ? { ...ext, enabled: e.target.checked } : ext
                            )
                          );
                        }}
                      />
                      <div className="w-full h-full bg-gray-500 rounded-full peer-checked:bg-[hsl(3,86%,64%)] transition-colors"></div>
                      <div className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-7 transition-transform"></div>
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
