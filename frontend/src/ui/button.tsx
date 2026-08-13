export const Button = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`w-full py-2.5 font-medium cursor-pointer text-sm bg-[#d0d0d0] text-[#121214] border-none rounded-[5px] ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const OutlineButton = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`w-full py-2.5 text-sm font-medium text-[#d0d0d0] bg-transparent border border-[#303036] rounded-[5px] cursor-pointer ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
