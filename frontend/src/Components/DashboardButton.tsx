import {Link} from 'react-router-dom'

type buttonTypes = {
    onClick: any,
    name?: string
}

export function DashboardButton({onClick, name}: buttonTypes){
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

type linkTypes = {
    onSelect: any,
    name?: string,
    to: string
}

export function DashboardLink({onSelect, name, to}: linkTypes){

    return (
 
        <Link
            onClick={(e) => {onSelect(e)}}
            to= {to}
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
