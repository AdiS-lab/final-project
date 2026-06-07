
import {NavBar, HeroSection, Section1, Section2, Pricing, Footer} from './FirstSection.tsx'
import '../index.css'

export default function LandingPage(){
    return(
        <>
            <div className = 'w-full h-screen grid grid-rows-[50px_1fr]'>
                <NavBar/>
                <HeroSection />
            </div>
            <div>
                <Section1/>
                <Section2/>
                <Pricing />
                <Footer />
            </div>
        </>
    )
}

