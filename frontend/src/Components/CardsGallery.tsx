import {useState} from 'react'

type propTypes = {
    previewImage: string,
    name: string,
    onClick: () => void
    deleteSession: ()=> void
}

function GalleryCards({ previewImage, name, onClick, deleteSession}: propTypes){
    const [deleteLoading, setDeleteLoading] = useState(false)

    function handleDelete(){
        setDeleteLoading(true)
        deleteSession()
    }

    return(
        <div className="w-[300px] h-[290px] bg-[#161616] rounded-[10px] border border-[#2a2a2a] overflow-hidden transition-shadow duration-200 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] cursor-pointer relative">
            <button onClick = {onClick} className="w-full h-full bg-transparent border-0 p-0 cursor-pointer flex flex-col absolute">
                <img src={previewImage} alt={name} className="w-full flex-1 object-cover rounded-t-[8px] block min-h-0" />
                <span className="px-3 py-2 text-[#d0d0d0] text-[13px] font-medium text-left truncate shrink-0">{name}</span>
            </button>
            <div className='group absolute bottom-2 right-2'>
                <button className='text-xs px-2 py-1 rounded cursor-pointer border border-[#3a3a3a]' style={{ background: '#1e1e1e', color: '#888888' }}>···</button>
                <div className={`transition-opacity duration-150 absolute bottom-full right-0 mb-1 rounded border border-[#3a3a3a] ${deleteLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} style={{ background: '#1e1e1e' }}>
                    {!deleteLoading
                        ? <button onClick={handleDelete} className='text-xs px-3 py-2 cursor-pointer block w-full text-left' style={{ color: '#888888' }}>Delete</button>
                        : <div className='flex items-center justify-center text-xs px-3 py-2'><span className='w-3 h-3 border-2 border-[#3a3a3a] border-t-[#888888] rounded-full animate-spin inline-block'></span></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GalleryCards