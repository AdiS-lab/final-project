export const Field = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

export const Label = ({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={`text-xs font-medium text-[#888888] ${className ?? ""}`}
      {...props}
    >
      {children}
    </label>
  );
};

export const FormCard = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col gap-6 p-10 w-full max-w-md bg-[#1a1a1e] border border-[#28282c] rounded-lg ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
