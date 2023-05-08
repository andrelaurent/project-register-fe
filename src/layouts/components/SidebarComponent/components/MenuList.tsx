import NavItem from './NavItem'
import List from '@mui/material/List';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { useSelector, useDispatch } from "react-redux";
import { MENU_OPEN } from '../../../../constants/actions'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { childListButtonStyle, listButtonStyle } from "../constant";
import { groupBy } from 'mixin/general';
import NavGroup from './NavGroup';

const MenuList = () => {
    const dispatch = useDispatch()
    const menuOpen = useSelector((state:any) => state.customization.isOpen)
    const leftDrawerOpen = useSelector((state:any) => state.customization.opened)
    const location = useLocation()

    const handleClick = (id:string, childId:string) => {
        dispatch({ type: MENU_OPEN, id: [id, childId] })
        console.log('menu open', menuOpen)
    }

    useEffect(() => {
        var selectedMenu = global.session.role.menu_access.find((a:any) => a.url === location.pathname)
        handleClick(selectedMenu?.id, '0')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PerfectScrollbar
            component="div"
            style={{
                position: 'relative',
                height: 'calc(100vh - 5rem)',
                padding: leftDrawerOpen ? '16px' : 0,
                display: leftDrawerOpen ? 'flex' : 'none',
                flexDirection: 'column',
                zIndex: 1,
                background: "rgb(var(--theme-bg-base))"
            }}
        >   
            <List sx={{p: 0}}>
                {
                    groupBy(global?.session?.role?.menu_access, 'group')?.map((item:any, n:number) => {
                        console.log(item.type, 'check item type')
                        if (item.type === 'collapse') return <NavGroup item={item} listButtonStyle={listButtonStyle} childListButtonStyle={childListButtonStyle} handleClick={handleClick} selected={menuOpen} />
                        else if (item.type === 'group') return <NavItem item={item} listButtonStyle={listButtonStyle} handleClick={handleClick} selected={menuOpen} />
                        return <NavItem item={item} listButtonStyle={listButtonStyle} handleClick={handleClick} selected={menuOpen} />
                    })
                }
            </List>
            
            {/* {menuItems.items.map((item:any) => {
                return (
                    <>
                        <List
                            sx={{
                                p: 0
                            }}
                            subheader={
                                item?.title ? 
                                    <ListSubheader component="div" id="nested-list-subheader" sx={subHeaderStyle}>
                                        {item?.title} <br />
                                        <small className="text-gray-500">{item?.caption}</small>
                                    </ListSubheader> : null
                            }
                        >
                            {
                                item.children.map((child:any) => {
                                    if (child.type === 'collapse') return <NavGroup item={child} listButtonStyle={listButtonStyle} childListButtonStyle={childListButtonStyle} handleClick={handleClick} selected={menuOpen} />
                                    else if (child.type === 'group') return <NavItem item={child} listButtonStyle={listButtonStyle} handleClick={handleClick} selected={menuOpen} />
                                    else return <NavItem item={child} listButtonStyle={listButtonStyle} handleClick={handleClick} selected={menuOpen} />
                                })
                            }
                        </List>
                        <Divider light sx={{ my: 2 }} />
                    </>
                )
            })} */}
        </PerfectScrollbar>
    )
}

export default MenuList