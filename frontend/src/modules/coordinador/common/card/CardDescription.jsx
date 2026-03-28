export function CardDescription({ descripcion, className }) {
  return (
    <div className="h-35 px-4 pt-3 pb-0">
      <p className={`text-sm ${className}`}>{descripcion}</p>
    </div>
  );
}
