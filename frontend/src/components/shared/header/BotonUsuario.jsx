export function BotonUsuario({ onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={`ml-auto mr-3 h-8 w-8 rounded-full bg-primary cursor-pointer hover:opacity-90 transition-opacity ${className}`}
    />
  );
}
