import Gallery from './Gallery'
import {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import SidebarDashboard from '../Components/SidebarDashboard'
import {useUserSession} from  '../FrontendAuth/globalState'
import {useNavigate} from 'react-router-dom'

function Dashboard(){
    const {userSession} = useUserSession((state) =>state)
    const accessToken = userSession.accessToken
    const header = {headers:{Authorization: `Bearer ${accessToken}`}}
    const [loading, setLoading] = useState<Boolean>(false)
    const [signoutLoading, setSignoutLoading] = useState<Boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<Boolean>(false)


    const navigate = useNavigate()

    

    const [name, setName] = useState("")
    let [imgArr, setImgArr] = useState([])

    const dialogRef = useRef<HTMLDialogElement>(null)
    useEffect(()=>{
        async function getCanvasData(){
            try{


                type canvasData = {
                    img_url: string
                    id: string
                    name: string
                }

                console.log("Dashboard access token: " +  accessToken)
                const canvasParts = await axios.get('/canvasData', header)
                const data = canvasParts.data.response
                console.log("canvas data look for name " +  data[0].name)
                const newArr = data.map((canvasData: canvasData)=>{
                    console.log('imgURL'+ canvasData.img_url)
                    return {imgUrl: canvasData.img_url, 
                        imgId: canvasData.id,
                        imgName: canvasData.name}
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


    function goToCanvas(){
        console.log('made it')

        if(!dialogRef.current) return
        setName("")
        dialogRef.current.showModal()
    }   

    async function handleCreate(){
        if(!dialogRef.current) return
        try{
            console.log(name)
            setLoading(true)
            const response = await axios.post('/createCanvas', {nameOf: name}, header)
            const data = response.data
            const id = data[0].id
            console.log(id)
            if(!id) return 
            console.log(response.data)
            dialogRef.current.close() // need to pass name prop onto canvas + props into cards
            navigate(`/canvas/${id}`)

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
        navigate(`/canvas/${id}`, {replace:true})
    } 
    
    async function deleteSession(id: string){
        setDeleteLoading(true)
        console.log('made it to delete')
        const response = await axios.delete(`/deleteCanvas/${id}`, header)
        console.log(response)
        window.open('/dashboard','_self')
    }

    function signOut(){
        setSignoutLoading(true)
        axios.delete(`/deleteUser`, header)
        navigate('/', {replace:true})
    }



    return(
        <>
            <div className= 'flex flex-row w-full min-h-screen'>
                <SidebarDashboard onClick = {goToCanvas} signOut = {signOut} signoutLoading = {signoutLoading}/>
                <Gallery imgArr = {imgArr}  handleClick = {handleClick} deleteSession = {deleteSession} deleteLoading = {deleteLoading}/>
            </div>
            <dialog ref={dialogRef} className='w-[360px] rounded-xl border border-[#2a2a2a] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0' style={{ background: 'rgba(22, 22, 22, 0.92)', color: '#d0d0d0' }}>
                <div className='flex flex-col gap-4 p-6'>
                    <h1 className='text-base font-semibold'>New Session</h1>
                    <input onChange={e => setName(e.target.value)} value = {name} type='text' placeholder='Session name' className='w-full px-3 py-2 rounded-md text-sm bg-transparent border border-[#2a2a2a] text-[#d0d0d0] placeholder-[#444] outline-none' />
                    <div className='flex gap-3 justify-end'>
                        <button className='text-sm px-4 py-1.5 rounded-md border border-[#2a2a2a] cursor-pointer' onClick={handleClose}>Cancel</button>
                        {!loading ? <button className='text-sm px-4 py-1.5 rounded-md border border-[#2a2a2a] cursor-pointer' onClick={handleCreate}>Create</button>
                        :<div className='text-sm px-4 py-1.5 rounded-md border border-[#2a2a2a] flex items-center gap-2'><span className='w-3.5 h-3.5 border-2 border-[#444] border-t-[#d0d0d0] rounded-full animate-spin inline-block'></span>Creating</div>
                        }
                    </div>
                </div>
            </dialog>
    </>
    )
}
export default Dashboard