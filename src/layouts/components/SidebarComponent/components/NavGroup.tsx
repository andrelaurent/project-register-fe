import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import * as TablerIcon from '@tabler/icons'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface NavGroupProps {
    item: any,
    listButtonStyle: any,
    childListButtonStyle: any,
    handleClick: Function,
    selected: String[]
}

const NavGroup = ({ item, listButtonStyle, childListButtonStyle, handleClick, selected }: NavGroupProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const ParentIcon = TablerIcon[item.icon as keyof typeof TablerIcon]

    useEffect(() => {
        var index = item.children.findIndex((x:any) => x.id === selected[0])
        if (index !== -1) setOpen(true)
        else setOpen(false)
    }, [selected, item])

    
    const handleNavigate = (child:any) => {
        handleClick(child.id)
        navigate(child.url)
    }

    return (
        <List sx={{ p: 0 }}>
            <ListItemButton sx={listButtonStyle} onClick={() => setOpen(!open)} selected={item.children.findIndex((x:any) => x.id === selected[0]) !== -1}>
                <ListItemIcon>
                    <ParentIcon stroke={1.5} size="20px"  />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                {open ? <TablerIcon.IconChevronUp stroke={1.5} size="20px" /> : <TablerIcon.IconChevronDown stroke={1.5} size="20px" />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        item.children.map((child:any) => {
                            return (
                                <ListItemButton sx={childListButtonStyle} selected={selected.findIndex(x => x === child.id) !== -1} onClick={() => handleNavigate(child)}>
                                    <ListItemIcon>
                                        {
                                            (() => {
                                                return <TablerIcon.IconPoint  stroke={1.5} size="15px" />
                                            })
                                            ()
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={child.title} />
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Collapse>
        </List>
    )
}

export default NavGroup