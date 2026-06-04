import {DashboardButton} from './DashboardButton.tsx'

type sidebarType = {
    onClick: ()=> void
}


function DashboardSidebar({onClick}: sidebarType){
    return(

         <div className='w-25 flex flex-col items-center justify-center gap-4' style={{
                background: '#111111',
                borderRight: '1px solid #1a1a1a',
            }}>
                <DashboardButton onClick = {onClick} name = {'Start'}/>
        </div>
    )
}

export default DashboardSidebar