import { StyledLink } from "../../ui";

export function Footer() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 py-12 bg-[#121214] border-t border-[#222226]">
      <StyledLink to="/signup" className="px-6 py-2.5">
        Sign Up
      </StyledLink>
      <p className="text-xs text-[#444444]">Draw Anything &copy; 2025</p>
    </div>
  );
}
