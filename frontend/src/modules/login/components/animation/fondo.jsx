import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Fondo() {
  return (
    <div className="h-48 sm:h-64 md:h-80 w-full max-w-lg mx-auto flex justify-center items-center">
      <DotLottieReact
        src="https://lottie.host/c14eff85-5690-4991-86fb-94cb1eeb49e4/lgrAYDBTrU.lottie"
        loop
        autoplay
        className="w-full h-full object-contain"
      />
    </div>
  );
}
