import {Link} from 'react-router-dom'

type buttonTypes = {
    onClick: any,
    name?: string
}

export function DashboardButton({onClick, name}: buttonTypes){
    return (
        <button onClick = {onClick} className='flex items-center text-xs font-medium cursor-pointer w-full px-4 h-11 border-none border-b border-[#1a1a1a]'
        style={{ color: '#888888', background: 'rgba(255,255,255,0.03)' }}>{name}</button>
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
            className='flex items-center justify-center text-xs font-medium cursor-pointer w-[60px] h-[60px] border border-[#2a2a2a] rounded-md'
            style={{ color: '#d0d0d0', background: 'rgba(255,255,255,0.04)' }}
        >{name}</Link>
    )
}
