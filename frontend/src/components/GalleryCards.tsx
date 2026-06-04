type propTypes = {
    previewImage: string,
    name: string,
    onClick: () => void
}

function GalleryCards({ previewImage, name, onClick }: propTypes){

    return(
        <div className="w-[300px] h-[290px] bg-[#161616] rounded-[10px] border border-[#2a2a2a] overflow-hidden transition-shadow duration-200 hover:shadow-[0_0_16px_rgba(255,255,255,0.08)] cursor-pointer">
            <button onClick = {onClick} className="w-full h-full bg-transparent border-0 p-0 cursor-pointer flex flex-col">
                <img src={previewImage} alt={name} className="w-full flex-1 object-cover rounded-t-[8px] block min-h-0" />
                <span className="px-3 py-2 text-[#d0d0d0] text-[13px] font-medium text-left truncate shrink-0">{name}</span>
            </button>
        </div>
    )
}

export default GalleryCards