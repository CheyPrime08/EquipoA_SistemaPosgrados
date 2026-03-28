export function CardTitle({ label, ciclo, cicloClassName, children }) {
  return (
    <div className="h-26 p-4 flex flex-col justify-end bg-sidebar relative overflow-hidden">
      {children}
      <span className="text-xs font-medium tracking-widest text-sidebar-foreground/50 uppercase z-10 relative mb-1">
        {label}
      </span>
      <span
        className={`text-2xl tracking-tight z-10 relative ${cicloClassName}`}
      >
        {ciclo}
      </span>
    </div>
  );
}
