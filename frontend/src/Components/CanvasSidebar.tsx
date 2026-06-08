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
                {!webcamActive ? <DashboardButton onClick = {onStart} name = {'Start webcam'}/> : <DashboardButton onClick = {onStop} name = "Stop" />}
                <DashboardButton onClick = {clearAll} name = {"Clear all"} />
                <p className='text-xs px-3 pt-4 leading-relaxed text-center w-full' style={{ color: '#444444' }}>Use two hands to select a mode and one hand to alter it. Green dots represent your pointer finger.</p>

        </div>
    )
}

export default Sidebar