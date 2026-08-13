export const PageBackground = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center bg-[#121214] ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
