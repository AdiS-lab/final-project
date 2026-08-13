type CardProps = {
    header: string
    description: string
}

export function Card({ header, description }: CardProps){

    return(
        <div className='grid grid-rows-[40px_1fr] w-80 h-72 p-6' style={{
            background: '#1a1a1e',
            border: '1px solid #28282c',
            borderRadius: '8px',
        }}>
            <div className='flex items-center'>
                <h2 className='font-normal text-sm' style={{ color: '#d0d0d0' }}>{header}</h2>
            </div>
            <div className='flex items-start'>
                <p className='text-xs leading-relaxed' style={{ color: '#555555' }}>{description}</p>
            </div>
        </div>
    )
}
