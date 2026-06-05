import {DashboardButton} from './DashboardButton.tsx'
 

type propTypes = {
    endSession: ()=>void
    onStart: ()=>Promise<void>,
    onStop: ()=>void,
    clearAll: ()=>void,
    switchCanvas: (e: any)=>void,
    webcamActive: Boolean,
}


function Sidebar({endSession, onStart, onStop, clearAll, switchCanvas, webcamActive}: propTypes){

return(
        <div className='w-25 flex flex-col items-center justify-center gap-4' style={{
                background: '#111111',
                borderRight: '1px solid #1a1a1a',
            }}>
                
                <DashboardButton onClick = {switchCanvas} name = {'Dashboard'}/> 
                {!webcamActive ? <DashboardButton onClick = {onStart} name = {'Start webcam'}/> : <DashboardButton onClick = {onStop} name = "Stop" />}
                <DashboardButton onClick = {clearAll} name = {"Clear all"} /> 
                <DashboardButton onClick = {endSession} name={'End Session'}/> 

        </div>
    )
}

export default Sidebar