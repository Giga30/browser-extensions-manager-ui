'use client';

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    const html = document.documentElement;
    if (dark){
      html.classList.add("dark");
    }else{
      html.classList.remove("dark");
    }
  })

  return (
    <div className="">

    </div>
  );
}
