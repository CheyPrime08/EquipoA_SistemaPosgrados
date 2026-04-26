import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Fondo({ src }) {
  return (
    <div className="h-48 sm:h-64 md:h-80 w-full max-w-lg mx-auto flex justify-center items-center">
      <DotLottieReact
        src={src}
        loop
        autoplay
        className="w-full h-full object-contain"
      />
    </div>
  );
}
