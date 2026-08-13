import { StyledLink } from "../../ui";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-[#1a1a1e]/80 backdrop-blur-md border-b border-[#28282c] z-50">
      <h1 className="text-base font-semibold text-[#d0d0d0] tracking-wide">
        Draw Anything
      </h1>

      <div className="flex items-center gap-6">
        <StyledLink
          to="/dashboard"
          className="border-none bg-transparent text-[#555555] font-normal"
        >
          Log in
        </StyledLink>
        <StyledLink to="/signup">Sign up</StyledLink>
      </div>
    </nav>
  );
}