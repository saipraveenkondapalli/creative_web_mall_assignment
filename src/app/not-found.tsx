import React from "react";
import { CiSearch } from "react-icons/ci";

function pageNotFound() {
  return (
    <div className={"min-h-screen flex justify-center items-center flex-col"}>
      <h1 className={"font-bold text-7xl  text-center"}>404</h1>

      <CiSearch className={"text-5xl"} />
      <div className={" font-medium mt-5"}>
        Sorry, We could find the page you are looking for
      </div>
    </div>
  );
}

export default pageNotFound;
