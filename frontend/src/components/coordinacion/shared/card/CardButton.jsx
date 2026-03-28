export function CardButton({ icon: Icon, onClick, onMouseDown, isPressed, iconClassName }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseDown={onMouseDown}
      className="relative overflow-hidden rounded-full p-2 hover:bg-sidebar transition-colors cursor-pointer"
    >
      <span
        className={`borde-base ${isPressed ? "animacion-click" : ""}`}
      />
      <Icon className={`h-5 w-5 z-10 relative ${iconClassName}`} />
    </button>
  );
}
