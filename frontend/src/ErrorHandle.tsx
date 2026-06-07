import {Link} from 'react-router-dom'

export default function ErrorHandle(){
    return(
        <div className='w-full h-screen flex items-center justify-center bg-zinc-950'>
            <div className='flex flex-col items-center gap-4'>
                <p className='text-sm font-normal text-zinc-500'>
                    You reached the wrong place try going back to the{' '}
                    <Link className='text-sm font-medium px-3 py-1 text-zinc-300 border border-zinc-800 rounded bg-white/[0.04]' to='/'>
                        Landing Page
                    </Link>
                </p>
            </div>
        </div>
    )
}