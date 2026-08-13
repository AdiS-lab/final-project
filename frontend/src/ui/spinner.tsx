export const Spinner = ({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) => {
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <span
      className={`${sizeClass} border-2 border-[#121214] border-t-transparent rounded-full animate-spin inline-block ${className ?? ""}`}
    />
  );
};

export const SpinnerLight = ({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) => {
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span
      className={`${sizeClass} border-2 border-[#333] border-t-[#888] rounded-full animate-spin inline-block ${className ?? ""}`}
    />
  );
};
