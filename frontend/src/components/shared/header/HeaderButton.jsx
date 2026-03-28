import { usePressAnimation } from "@/hooks/usePressAnimation";

export function HeaderButton({ onClick, icon: Icon, etiqueta = "Botón", className = "" }) {
  const { handlePress, isPressed } = usePressAnimation();

  return (
    <button
      onClick={onClick}
      onMouseDown={() => handlePress()}
      className={`relative overflow-hidden flex items-center justify-center p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none cursor-pointer ${className}`}
      aria-label={etiqueta}
    >
      <span className={`borde-base ${isPressed() ? "animacion-click" : ""}`} />
      <Icon className="h-5! w-5! shrink-0 transition-transform active:scale-95 z-10" />
    </button>
  );
}
