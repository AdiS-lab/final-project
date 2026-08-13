import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-2.5 outline-none text-sm bg-[#121214] border border-[#303036] rounded-[5px] text-[#d0d0d0] ${className ?? ""}`}
      {...props}
    />
  );
});
