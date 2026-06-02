import {DashboardButton, DashboardLink} from './DashboardButton.tsx'
 

type propTypes = {
    onStart: ()=>Promise<void>,
    onStop: ()=>void,
    clearAll: ()=>void,
    switchCanvas: (e: any)=>void,
    webcamActive: Boolean
}


function Sidebar({onStart, onStop, clearAll, switchCanvas, webcamActive}: propTypes){

return(
    <div className='flex flex-col items-center justify-center gap-4' style={{
            background: '#111111',
            borderRight: '1px solid #1a1a1a',
        }}>
            <DashboardLink onClick = {switchCanvas} name = {'Gallery'} />
            { !webcamActive ? <DashboardButton onClick = {onStart} name = {'Start webcam'}/> : <DashboardButton onClick = {onStop} name = "Stop" />}
            <DashboardButton onClick = {clearAll} name = {"Clear all"} /> 
        </div>
    )
}

export default Sidebar