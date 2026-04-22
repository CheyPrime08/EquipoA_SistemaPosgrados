import React from "react";

export function ButtoMail() {
  return (
    <button
      className="bg-[#9f876f] h-auto min-h-[48px] py-2 px-4 w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-150 rounded-2xl text-white font-bold cursor-pointer hover:bg-[#ad9b83]
            flex items-center justify-center gap-2 text-[13px] md:text-base text-center leading-tight"
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-white dark:text-white shrink-0"
        aria-hidden="true"
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
          d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"
        />
      </svg>
      <span>Enviar Código a mi Correo Electrónico</span>
    </button>
  );
}

export function ButtonPhone() {
  return (
    <button
      className="bg-[#F9F8F6] border-2 border-[#c9b59c] h-auto min-h-[48px] py-2 px-4 w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-150 rounded-2xl text-black font-semibold cursor-pointer
            hover:bg-[#edece9] flex items-center justify-center gap-2 text-[13px] md:text-base text-center leading-tight"
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-white shrink-0"
        aria-hidden="true"
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
          d="M5.693 16.013H7.31a1.685 1.685 0 0 0 1.685-1.684v-.645A1.684 1.684 0 0 1 10.679 12h2.647a1.686 1.686 0 0 1 1.686 1.686v.646c0 .446.178.875.494 1.19.316.317.693.495 1.14.495h1.685a1.556 1.556 0 0 0 1.597-1.016c.078-.214.107-.776.088-1.002.014-4.415-3.571-6.003-8-6.004-4.427 0-8.014 1.585-8.01 5.996-.02.227.009.79.087 1.003a1.558 1.558 0 0 0 1.6 1.02Z"
        />
      </svg>
      <span>Ingresar con mi Número de Teléfono</span>
    </button>
  );
}
