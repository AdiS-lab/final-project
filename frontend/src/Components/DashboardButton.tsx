import { StyledLink } from '../ui'

type buttonTypes = {
    onClick: any,
    name?: string
}

export function DashboardButton({onClick, name}: buttonTypes){
    return (
        <button onClick = {onClick} className='flex items-center text-xs font-medium cursor-pointer w-full px-4 h-11 border-none border-b border-[#222226]'
        style={{ color: '#d0d0d0', background: 'rgba(255,255,255,0.03)' }}>{name}</button>
    )
}

type linkTypes = {
    onSelect: any,
    name?: string,
    to: string
}

export function DashboardLink({onSelect, name, to}: linkTypes){

    return (
        <StyledLink
            to={to}
            className='flex items-center justify-center w-[60px] h-[60px] text-xs rounded-md'
        >{name}</StyledLink>
    )
}
