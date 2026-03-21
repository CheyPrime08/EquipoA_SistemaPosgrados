export function AppPanel({ children }) {
  return (
    <main className="flex-1 bg-sidebar overflow-hidden">
      <section className="h-full w-full bg-background rounded-tl-[1.8rem] p-8 overflow-y-auto relative z-20">
        {children}
      </section>
    </main>
  );
}
