import { Separator } from "@/components/ui/separator";

export function CardAyuda({ texto1, texto2 }) {
  return (
    <div
      className="p-4 rounded-2xl h-auto"
      style={{
        boxShadow: "6px 6px 10px #D9D4CF, -6px -6px 10px #FFFEF7",
      }}
    >
      <p
        className="text-[19px] font-semibold text-[#74695a] tracking-wider flex items-center gap-2"
        style={{ fontFamily: "Playfair Display" }}
      >
        <svg
          className="w-6 h-6 text-[#74695a]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        ¿NECESITAS AYUDA?
      </p>
      <Separator className="bg-[#a5937e67] my-3" />
      <div className="flex gap-2 items-center">
        <p className="font-light">
          {texto1}
          <br />
          <br />
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="font-light">{texto2}</p>
      </div>
    </div>
  );
}
