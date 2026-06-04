import GalleryCards from '../Components/GalleryCards'

type imgArr = {
    imgArr:{imgUrl: string, imgId: string}[], 
    handleClick: (id:string)=>void
}

const Gallery = ({imgArr, handleClick}:imgArr)=>{
    console.log(imgArr)

    console.log(imgArr)
    return(
        <div className='h-full w-full flex flex-col' style={{ background: '#1a1a1a' }}>
            <div className='px-8 py-6' style={{ borderBottom: '1px solid #2a2a2a' }}>
                <h1 className='text-xl font-semibold' style={{ color: '#d0d0d0', letterSpacing: '0.02em' }}>Dashboard</h1>
            </div>
            <div className='p-8 w-full flex gap-6 flex-wrap'>
                {imgArr.map((img: {imgUrl: string, imgId: string}, index: number)=>(
                    img.imgUrl && <GalleryCards key = {'card' + index} previewImage={img.imgUrl} name={'yeay'} onClick = {()=>handleClick(img.imgId)}/>
                ))
                }
            </div>
        </div>
        
    )
}

export default Gallery