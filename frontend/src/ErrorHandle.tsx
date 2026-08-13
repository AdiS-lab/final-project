import { StyledLink } from './ui'

export default function ErrorHandle(){
    return(
        <div className='w-full h-screen flex items-center justify-center bg-zinc-950'>
            <div className='flex flex-col items-center gap-4'>
                <p className='text-sm font-normal text-zinc-500'>
                    You reached the wrong place try going back to the{' '}
                    <StyledLink to='/'>
                        Landing Page
                    </StyledLink>
                </p>
            </div>
        </div>
    )
}