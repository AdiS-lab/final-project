import {DashboardButton} from './DashboardButton.tsx'
import { SidebarContainer, SpinnerLight } from '../ui'

type sidebarType = {
    onClick: ()=> void
    signOut: ()=>void
    signoutLoading: Boolean
}


function DashboardSidebar({onClick, signOut, signoutLoading}: sidebarType){
    return(
         <SidebarContainer>
                <DashboardButton onClick = {onClick} name = {'Start'}/>
                {!signoutLoading ? <DashboardButton onClick = {signOut} name = {'Sign Out'}/> : <div className='flex items-center gap-2 w-full px-4 h-11 text-xs font-medium' style={{ color: '#888888', background: 'rgba(255,255,255,0.03)' }}><SpinnerLight />Loading</div>}
        </SidebarContainer>
    )
}

export default DashboardSidebar
