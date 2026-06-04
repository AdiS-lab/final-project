export function Card(){

    return(
        <div className='grid grid-rows-[40px_1fr] w-80 h-56 p-6' style={{
            background: '#111111',
            border: '1px solid #1f1f1f',
            borderRadius: '8px',
        }}>
            <div className='flex items-center'>
                <h2 className='font-normal text-sm' style={{ color: '#d0d0d0' }}>Card Header</h2>
            </div>
            <div className='flex items-start'>
                <p className='text-xs leading-relaxed' style={{ color: '#555555' }}>Card Content</p>
            </div>
        </div>
    )
}
