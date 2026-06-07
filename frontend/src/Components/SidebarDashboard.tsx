import {DashboardButton} from './DashboardButton.tsx'

type sidebarType = {
    onClick: ()=> void
    signOut: ()=>void
}


function DashboardSidebar({onClick, signOut}: sidebarType){
    return(

         <div className='w-40 flex flex-col items-start justify-start gap-1 p-2 border-r border-[#1a1a1a]' style={{ background: '#111111' }}>
                <DashboardButton onClick = {onClick} name = {'Start'}/>
                <DashboardButton onClick = {signOut} name = {'Sign Out'}/>
        </div>
    )
}

export default DashboardSidebar