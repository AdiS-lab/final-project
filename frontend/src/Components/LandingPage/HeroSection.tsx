
import handUpscaled from "../../../images/hand-upscaled.jpg"

export function HeroSection() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-end pb-[18vh] gap-5 border-b-1 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105"
        style={{ backgroundImage: `url(${handUpscaled})` }}
      />
      <h1 className="relative text-9xl font-semibold text-[#d0d0d0] -tracking-tight">
        Foci
      </h1>
      <h2 className="relative text-lg font-normal text-[#555555]">
        Reset your focus in
        unorthodox ways
      </h2>
    </div>
  );
}
