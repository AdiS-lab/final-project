import {DashboardButton} from './DashboardButton.tsx'

type sidebarType = {
    onClick: ()=> void
    signOut: ()=>void
    signoutLoading: Boolean
}


function DashboardSidebar({onClick, signOut, signoutLoading}: sidebarType){
    return(

         <div className='w-40 flex flex-col items-start justify-start gap-1 p-2 border-r border-[#1a1a1a]' style={{ background: '#111111' }}>
                <DashboardButton onClick = {onClick} name = {'Start'}/>
                {!signoutLoading ? <DashboardButton onClick = {signOut} name = {'Sign Out'}/> : <div className='flex items-center gap-2 w-full px-4 h-11 text-xs font-medium' style={{ color: '#888888', background: 'rgba(255,255,255,0.03)' }}><span className='w-3 h-3 border-2 border-[#333] border-t-[#888] rounded-full animate-spin inline-block'></span>Loading</div>}
        </div>
    )
}

export default DashboardSidebar