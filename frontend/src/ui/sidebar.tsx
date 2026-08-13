export const SidebarContainer = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`w-40 flex flex-col items-start justify-start gap-1 p-2 border-r border-[#222226] ${className ?? ""}`}
      style={{ background: "#1a1a1e" }}
      {...props}
    >
      {children}
    </div>
  );
};
