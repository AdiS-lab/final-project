import {Link} from 'react-router-dom'
import {Card} from '../Components/CardsComponent.tsx'

export function NavBar(){

    return(
        <nav className='w-full flex items-center justify-between px-10 py-4' style={{
            background: '#111111',
            borderBottom: '1px solid #1f1f1f',
        }}>
            <h1 className='text-base font-semibold' style={{
                color: '#d0d0d0',
                letterSpacing: '0.05em',
            }}>
                Draw Anything
            </h1>

            <div className='flex items-center gap-6'>
                <Link to='/dashboard' className='text-sm font-normal' style={{
                    color: '#555555',
                }}>
                    Log in
                </Link>
                <Link to='/signup' className='text-sm font-medium px-4 py-1.5' style={{
                    color: '#d0d0d0',
                    border: '1px solid #2e2e2e',
                    borderRadius: '5px',
                    background: 'rgba(255,255,255,0.04)',
                }}>
                    Sign up
                </Link>
            </div>
        </nav>
    )
}

export function HeroSection(){

    return(
        <div className='w-full h-full grid grid-cols-[300px_1fr]' style={{
            background: 'linear-gradient(to bottom, #070707 0%, #111111 70%, #1e1a17 88%, #2e261e 100%)',
        }}>
            <div className='w-full h-full flex flex-col items-center justify-center px-8 gap-4'>
                <h1 className='text-3xl font-semibold' style={{ color: '#d0d0d0', letterSpacing: '0.02em' }}>Draw Anything</h1>
                <h2 className='text-sm font-normal' style={{ color: '#555555' }}>Let your hands do the talking</h2>
            </div>
            <div className='w-full h-full flex items-center justify-center p-4'>
                <div className='w-full rounded-lg overflow-hidden' style={{
                    height: '97vh',
                    border: '1px solid #1f1f1f',
                }}> 
                    <video className='w-full h-full object-cover' src='https://y0kk3sxdufphvwmb.public.blob.vercel-storage.com/Video%20Project%201.mp4' autoPlay muted loop></video>
                </div>
            </div>
        </div>
    )
}

export function Section1(){

    return(
        <div className='w-full flex justify-center items-center pt-24 pb-10' style={{
            background: '#0a0a0a',
            borderTop: '1px solid #1a1a1a',
        }}>
            <h1 className='text-2xl font-normal text-center' style={{
                color: '#d0d0d0',
            }}>
                Reinventing the Wheel
            </h1>
        </div>
    )
}


export function Section2(){

    return(
        <div className='w-full py-20 px-10 flex justify-center gap-8' style={{
            background: '#0a0a0a',
        }}>
            <Card header='Hand-Tracking' description='Move your hands around and see what happens. This project was just practice in getting an app developed end to end.'/>
            <Card header='Built From Scratch' description='No drag-and-drop builders, no shortcuts. Every layer of this, from the ML model to the auth flow, was figured out the hard way.'/>

        </div>
    )
}

export function Pricing(){
    return(
        <div className='w-full flex items-center justify-center py-24' style={{
            background: '#0a0a0a',
            borderTop: '1px solid #1a1a1a',
        }}>
            <div className='flex flex-col gap-6 p-10 w-full max-w-sm' style={{
                background: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: '10px',
            }}>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-sm font-medium' style={{ color: '#d0d0d0' }}>Pro</h2>
                    <p className='text-xs' style={{ color: '#555555' }}>Everything you need to get drawing</p>
                </div>
                <div className='flex items-end gap-1'>
                    <span className='text-3xl font-semibold' style={{ color: '#d0d0d0' }}>$9</span>
                    <span className='text-sm pb-1' style={{ color: '#555555' }}>/month</span>
                </div>
                <div className='flex flex-col gap-2'>
                    {['Unlimited canvases', 'Hand-tracking', 'Cloud storage'].map(feature => (
                        <p key={feature} className='text-xs' style={{ color: '#555555' }}>— {feature}</p>
                    ))}
                </div>
                <button className='w-full py-2.5 text-sm font-medium' style={{
                    color: '#0a0a0a',
                    background: '#d0d0d0',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    Get Started
                </button>
            </div>
        </div>
    )
}


export function Footer(){

    return(
        <div className='w-full flex flex-col items-center justify-center gap-4 py-12' style={{
            background: '#0a0a0a',
            borderTop: '1px solid #1a1a1a',
        }}>
            <Link to='/signup' className='text-sm font-normal px-6 py-2.5' style={{
                color: '#d0d0d0',
                border: '1px solid #2a2a2a',
                borderRadius: '5px',
            }}>
                Sign Up
            </Link>
            <p className='text-xs' style={{ color: '#444444' }}>Draw Anything &copy; 2025</p>
        </div>
    )
}