import React from "react";
import Header from "./header/header";
import Main from "./main/main";

export default function ContentMain() {
  return (
    <>
      <div className="w-full min-h-screen bg-[#F9F8F6] overflow-x-hidden">
        <Header />
        <Main />
      </div>
    </>
  );
}
