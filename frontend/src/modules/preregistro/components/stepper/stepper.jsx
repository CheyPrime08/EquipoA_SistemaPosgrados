import React from "react";
import { Spinner } from "@/components/ui/spinner";

const Stepper = ({ currentStep, steps }) => {
  const descripccion = (index) => {
    if (index < currentStep)
      return (
        <div className="flex items-center gap-1 text-[#4caf50]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 48 48"
          >
            <path
              fill="#c8e6c9"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              fill="#4caf50"
              d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
            ></path>
          </svg>
          <span>Listo</span>
        </div>
      );
    if (index === currentStep)
      return (
        <span className="text-[#74695a] flex items-center gap-2">
          <Spinner className="size-4" /> En progreso
        </span>
      );
    return (
      <span className="text-[#A89884] flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[#A89884]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.5 11H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4.5M7 11V7a3 3 0 0 1 6 0v1.5m2.5 5.5v1.5l1 1m3.5-1a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
          />
        </svg>
        Pendiente
      </span>
    );
  };

  return (
    <div className="w-full max-w-[600px] mx-auto rounded-lg p-5">
      <div className="flex flex-col justify-between mb-5 items-start gap-8 sm:gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex items-center gap-4 w-full">
            <div
              style={{
                backgroundColor: index <= currentStep ? "#D3BEA4" : "#EFE9E3",
                boxShadow:
                  index <= currentStep
                    ? "inset 3px 3px 5px #A89883, inset -3px -3px 5px #F2DABD"
                    : "3px 3px 5px #D9D4CF, -3px -3px 5px #FFFEF7",
                color: index === currentStep ? "#74695a" : "#A89884",
              }}
              className="w-[60px] h-[60px] sm:w-[50px] sm:h-[50px] shrink-0 rounded-full text-[17px] flex justify-center items-center font-bold transition-all duration-300"
            >
              {index + 1}
            </div>
            <div className="flex flex-col">
              <span
                className="text-[17px] sm:text-[19px] font-semibold tracking-wider transition-colors duration-300"
                style={{
                  fontFamily: "Playfair Display",
                  color: index === currentStep ? "#000" : "#74695a",
                }}
              >
                {step}
              </span>
              <div className="text-[14px] font-semibold text-[#685f52] mt-1">
                {descripccion(index)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
