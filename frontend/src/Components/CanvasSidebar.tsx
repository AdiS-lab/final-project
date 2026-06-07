import {DashboardButton} from './DashboardButton.tsx'
 

type propTypes = {
    onStart: ()=>Promise<void>,
    onStop: ()=>void,
    clearAll: ()=>void,
    switchCanvas: (e: any)=>void,
    webcamActive: Boolean,
}


function Sidebar({onStart, onStop, clearAll, switchCanvas, webcamActive}: propTypes){

return(
        <div className='w-40 flex flex-col items-start justify-start gap-1 p-2 border-r border-[#1a1a1a]' style={{ background: '#111111' }}>

                <DashboardButton onClick = {switchCanvas} name = {'Dashboard'}/>
                {!webcamActive ? <DashboardButton onClick = {onStart} name = {'Start webcam'}/> : <DashboardButton onClick = {onStop} name = "Stop" />}
                <DashboardButton onClick = {clearAll} name = {"Clear all"} />
                <p className='text-xs px-3 pt-4 leading-relaxed text-center w-full' style={{ color: '#444444' }}>Use two hands to select a mode and one hand to alter it. Green dots represent your pointer finger.</p>

        </div>
    )
}

export default Sidebar