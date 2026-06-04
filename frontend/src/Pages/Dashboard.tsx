import Gallery from './Gallery'
import {useRef, useState, useEffect} from 'react'
import axios from 'axios'

function Dashboard(){
    const [name, setName] = useState("")
    let [imgArr, setImgArr] = useState([])

    const dialogRef = useRef<HTMLDialogElement>(null)
    useEffect(()=>{
        async function getCanvasData(){
            try{

                type canvasData = {
                    img_url: string
                    id: string
                }
                const canvasParts = await axios.get('http://localhost:3000/canvasData',{withCredentials: true})
                const data = canvasParts.data.response
                const newArr = data.map((canvasData: canvasData)=>{
                    return {imgUrl: canvasData.img_url, 
                        imgId: canvasData.id}
                })

                setImgArr(newArr)
                console.log("newArr" + newArr)
            }
            catch(error){
                console.log(error)
            }
        }
        getCanvasData()
    },[])


    // function goToCanvas(){
    //     console.log('made it')

    //     if(!dialogRef.current) return
    //     setName("")
    //     dialogRef.current.showModal()
    // }   

    async function handleCreate(){
        if(!dialogRef.current) return
        console.log(name)

        try{
            const response = await axios.post('http://localhost:3000/createCanvas', {nameOf: name})
            const data = response.data
            const id = data[0].id
            console.log(id)
            if(!id) return 
            console.log(response.data)
            dialogRef.current.close() // need to pass name prop onto canvas + props into cards
            window.open(`./canvas/${id}`, '_self')

        }
        catch(error){
            console.log(error)
        }
    }
    
    
    function handleClose(){
        if(!dialogRef.current) return
        console.log(dialogRef.current)
        dialogRef.current.close()
    }

    function handleClick(id: string){
        window.open(`/canvas/${id}`, '_self')
        console.log(id)
    }   



    return(
        <>
            <div className= 'flex flex-row w-full h-screen overflow-hidden'>
                {/* <DashboardSidebar onClick = {goToCanvas}/> */}
                <Gallery imgArr = {imgArr}  handleClick = {handleClick}/>
            </div>
            <dialog ref={dialogRef} className='w-[360px] rounded-xl border border-[#2a2a2a]' style={{ background: 'rgba(22, 22, 22, 0.92)', color: '#d0d0d0' }}>
                <div className='flex flex-col gap-4 p-6'>
                    <h1 className='text-base font-semibold'>New Session</h1>
                    <input onChange={e => setName(e.target.value)} value = {name} type='text' placeholder='Session name' className='w-full px-3 py-2 rounded-md text-sm bg-transparent border border-[#2a2a2a] text-[#d0d0d0] placeholder-[#444] outline-none' />
                    <div className='flex gap-3 justify-end'>
                        <button className='text-sm px-4 py-1.5 rounded-md border border-[#2a2a2a] cursor-pointer' onClick={handleClose}>Cancel</button>
                        <button className='text-sm px-4 py-1.5 rounded-md border border-[#2a2a2a] cursor-pointer' onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
export default Dashboard