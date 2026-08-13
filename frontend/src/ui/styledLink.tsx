import { Link } from "react-router-dom";

export const StyledLink = ({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium px-4 py-1.5 text-[#d0d0d0] border border-[#303036] rounded-[5px] bg-white/[0.04] ${className ?? ""}`}
    >
      {children}
    </Link>
  );
};
