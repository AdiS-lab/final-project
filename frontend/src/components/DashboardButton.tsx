import {Link} from 'react-router-dom'

type propTypes = {
    onClick: any,
    name?: string
}

export function DashboardButton({onClick, name}: propTypes){
    return (
        <button onClick = {onClick} className='flex items-center justify-center text-xs font-medium cursor-pointer'
        style={{
        width: '60px',
        height: '60px',
        color: '#d0d0d0',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid #2a2a2a',
        borderRadius: '6px',
        }}>{name}</button>
    )
}



export function DashboardLink({onClick, name}: propTypes){

    return (
 
        <Link
            onClick={(e) => {onClick(e)}}
            to='/canvas/gallery'
            className='flex items-center justify-center text-xs font-medium cursor-pointer'
            style={{
                width: '60px',
                height: '60px',
                color: '#d0d0d0',
                border: '1px solid #2a2a2a',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px',
                
            }}
        >{name}</Link>
    )
}
