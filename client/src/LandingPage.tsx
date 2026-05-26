
import {Link} from 'react-router-dom'
import {NavBar, HeroSection, Section1, Section2, Pricing, Footer} from './Pages/FirstSection.tsx'
import './index.css'

export default function LandingPage(){
    return(
        <>
            <div className = 'p-4 w-full h-screen grid grid-rows-[50px_1fr] border-box'>
                <NavBar/>
                <HeroSection />
            </div>
            <div className = 'p-2'>
                <Section1/>
                <Section2/>
                <Pricing />
                <Footer />
            </div>
        </>
    )
}

