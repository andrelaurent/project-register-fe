import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import * as TablerIcon from '@tabler/icons'

interface NavItemProps {
    item: any,
    listButtonStyle: any,
    handleClick: Function,
    selected: String[]
}


const NavItem = ({item, listButtonStyle, handleClick, selected}: NavItemProps) => {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()
    const Icon = TablerIcon[item.icon as keyof typeof TablerIcon]
    

    useEffect(() => {
        var index = selected.findIndex(x => x === item.id)
        if (index > -1) setActive(true)
        else setActive(false)
    }, [selected, item])

    const handleNavigate = () => {
        handleClick(item.id)
        navigate(item.url)
    }

    return (
        <ListItemButton sx={listButtonStyle} selected={active} onClick={handleNavigate}>
            <ListItemIcon>
                <Icon stroke={1.5} size="20px" />
            </ListItemIcon>
            <ListItemText primary={item.title} />
        </ListItemButton>
    )
}

export default NavItem