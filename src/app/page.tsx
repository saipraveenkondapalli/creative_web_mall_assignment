import React from "react";
import { FaReact } from "react-icons/fa";
import { SiMongodb, SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import TechStack from "@/app/components/techstack";

function Page() {
  return (
    <div className=" min-h-screen container ">
      <div className={"text-center"}>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter  my-8">
          Creative Web Mall (India) <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-sky-700">
            Assignment
          </span>
        </h1>
        <div className={"text-gray-600 text-xl"}>
          This website is part of the assignment for the Creative Web Mall
          (India) Next.Js Job Role.
        </div>
      </div>
      <section id="tech-stack">
        <h2 className="text-5xl text-left  md:text-center  font-bold my-5">
          Tech Stack
        </h2>
        <TechStack />
      </section>
    </div>
  );
}

export default Page;
