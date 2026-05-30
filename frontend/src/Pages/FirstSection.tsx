import {Card} from '../components/Cards.tsx'
import {Link} from 'react-router-dom'

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
                <Link to='/login' className='text-sm font-normal' style={{
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
        <div className='w-full h-full grid grid-cols-2' style={{
            background: 'linear-gradient(to bottom, #0a0a0a 0%, #111111 70%, #1e1a17 88%, #2e261e 100%)',
        }}>
            <div className='w-full h-full flex flex-col justify-center px-16 gap-4'>
                <h1 className='text-3xl font-semibold' style={{ color: '#d0d0d0', letterSpacing: '0.02em' }}>Draw Anything</h1>
                <h2 className='text-sm font-normal' style={{ color: '#555555' }}>Let your hands do the talking</h2>
            </div>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='w-4/5 h-3/5 rounded-lg' style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid #1f1f1f',
                }}>
                </div>
            </div>
        </div>
    )
}

export function Section1(){

    return(
        <div className='w-full flex justify-center items-center py-24' style={{
            background: '#0a0a0a',
            borderTop: '1px solid #1a1a1a',
        }}>
            <h1 className='text-2xl font-normal text-center' style={{
                color: '#d0d0d0',
            }}>
                Hey There
            </h1>
        </div>
    )
}


export function Section2(){

    return(
        <div className='w-full py-20 px-10 flex justify-center gap-8' style={{
            background: '#0a0a0a',
        }}>
            <Card/>
            <Card/>
        </div>
    )
}

export function Pricing(){
    return(
        <div className='w-full flex items-center justify-center py-48' style={{
            background: '#0a0a0a',
            borderTop: '1px solid #1a1a1a',
        }}>
            <button className='text-sm font-normal px-6 py-2.5' style={{
                color: '#d0d0d0',
                border: '1px solid #2a2a2a',
                borderRadius: '5px',
                background: 'transparent',
            }}>
                Pricing
            </button>
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