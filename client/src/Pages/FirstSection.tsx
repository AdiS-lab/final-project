import {Card} from '../components/Cards.tsx'
import {Link} from 'react-router-dom'

export function NavBar(){

    return(
        <div className = 'flex flex-row gap-2 relative outline-1 outline-red-500'>
            <div className = 'grid grid-cols-2 gap-3 absolute right-0'>
                <Link to = '/signup' className = 'cursor-pointer'>Sign up</Link>
                <Link to = '/login' className = 'cursor-pointer'>Log in</Link>
            </div>

            <div className = 'absolute left-0'>
                <h1>Draw Anything</h1>
            </div>
        </div>
    )
}

export function HeroSection(){

    return(
        <>
            <div className = 'w-full h-full grid grid-cols-2 outline-1 outline-red-500'>
                <div className = 'w-full h-full flex justify-center items-center'>
                    <h1>Title</h1>
                    <h2>Subtitle</h2>
                </div>
                <div className = 'outline-1 outline-red-500'>
                    <video>INSERT VIDEO</video>
                </div>
            </div>
        </>
    )
}

export function Section1(){

    return(
        <>
            <div className = "h-50 w-full flex justify-center items-center outline-1 outline-red-500">
                <h1>
                    Hey There 
                </h1>
            </div>
        </>
    )
}


export function Section2(){

    return(
        <>
            <div className = "grid grid-cols-2">
                <Card/>
                <Card/>
            </div>
        </>
    )
}

export function Pricing(){
    return(
        <>
            <div className = 'h-200 flex items-center justify-center outline-1 outline-red-500'>
                <button>Pricing</button>
            </div>
        </>
    )
}


export function Footer(){

    return(
        <div className = 'h-50 flex items-center justify-center outline-1 outline-red-500'>
            <button>Sign Up</button>
        </div>
    )
}