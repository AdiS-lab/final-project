import { NavBar, HeroSection, Description, Footer } from "../components/LandingPage";
import "../index.css";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="w-full h-screen">
        <HeroSection />
      </div>

      <div>
        <Description />
        {/* <Section1 />
        <Section2 /> */}
        <Footer />
      </div>
    </>
  );
}
