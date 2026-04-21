export function PanelHeader({
  seccion,
  onSeccion,
  tabs = ["Egresados", "Aspirantes"],
}) {
  return (
    <div className="flex gap-6 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSeccion(tab)}
          className={`pb-2 text-sm font-medium transition-colors cursor-pointer border-b-2 ${
            seccion === tab
              ? "border-primary text-sidebar-foreground"
              : "border-transparent text-muted-foreground hover:text-sidebar-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
