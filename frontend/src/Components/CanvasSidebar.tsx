import {DashboardButton} from './DashboardButton.tsx'
 

type propTypes = {
    onStart: ()=>Promise<void>,
    onStop: ()=>void,
    clearAll: ()=>void,
    switchCanvas: (e: any)=>void,
    webcamActive: Boolean,
    loading: Boolean,
}


function Sidebar({onStart, onStop, clearAll, switchCanvas, webcamActive, loading}: propTypes){

return(
        <div className='w-40 flex flex-col items-start justify-start gap-1 p-2 border-r border-[#1a1a1a]' style={{ background: '#111111' }}>

                {!loading ? <DashboardButton onClick = {switchCanvas} name = {'Dashboard'}/> : <div className='flex items-center gap-2 w-full px-4 h-11 text-xs font-medium' style={{ color: '#888888', background: 'rgba(255,255,255,0.03)' }}><span className='w-3 h-3 border-2 border-[#333] border-t-[#888] rounded-full animate-spin inline-block'></span>Loading</div>}
                {!webcamActive ? <button onClick={onStart} className='flex items-center text-xs font-medium cursor-pointer w-full px-4 h-11 border-none' style={{ color: '#111111', background: '#d0d0d0' }}>Start webcam</button> : <button onClick={onStop} className='flex items-center text-xs font-medium cursor-pointer w-full px-4 h-11 border-none' style={{ color: '#4ade80', background: 'rgba(74,222,128,0.08)' }}>Stop webcam</button>}
                <DashboardButton onClick = {clearAll} name = {"Clear all"} />
        </div>
    )
}

export default Sidebar