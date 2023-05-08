import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';
import NavItem from 'layouts/components/SidebarComponent/components/NavItem';
import { List, ClickAwayListener } from '@mui/material'
import { listButtonStyle } from 'layouts/components/SidebarComponent/constant';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN } from 'constants/actions';
import SearchData from 'assets/lotties/search.json'
import Lottie from 'react-lottie'
import CustomTextField from 'components/fields/TextField';


const HeaderSearch = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [show, setShow] = useState(false)
    const [menu, setMenu] = useState<any[]>([])
    const menuOpen = useSelector((state:any) => state.customization.isOpen)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SearchData
    }

    useEffect(() => {
        handleData()
    }, [search, setSearch]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleData = () => {
        setMenu(global.session.role.menu_access.filter((a:any) => a.title.toLowerCase().includes(search)))
        if (search) setShow(true)
    }
    
    const handleClick = (id:string, childId:string) => {
        dispatch({ type: MENU_OPEN, id: [id, childId] })
        setShow(false)
    }

    const handleClickAway = () => {
        setShow(false)
    }


    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-full my-auto sm:hidden md:hidden lg:flex hidden relative" onFocus={handleData}>
                <CustomTextField type='text' theme="2" themeCustomization='false' placeholder='quick menu...' onInput={(e:string) => setSearch(e)}>
                    <div slot="preffix" className='flex flex-col justify-center px-2 text-grey-700'>
                        <IconSearch stroke={1.5} size="1.5rem" />
                    </div>
                    <div slot="suffix" className='flex flex-col justify-center px-2'>
                        <button className='button-secondary-main rounded-main p-2'>
                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                        </button>
                    </div>
                </CustomTextField>
                {
                    search && show ? 
                        <div className="animate-fade-in-down absolute theme-base w-[90%] top-[110%] shadow-lg px-5 border border-solid z-10 rounded-lg">
                            {
                                menu?.length > 0 ?
                                    <List>
                                        {
                                            menu?.map((item:any) => {
                                                return (
                                                    <NavItem item={item} listButtonStyle={listButtonStyle} handleClick={handleClick} selected={menuOpen} />
                                                )
                                            })
                                        }
                                    </List> : 
                                        <div className="flex flex-col text-center no-result w-4/5 pb-10 mx-auto">
                                            <Lottie options={defaultOptions} />
                                            <h1 className='m-0'>No Result Found</h1>
                                            <span className='m-0 text-grey-500'>Please Try Another Search</span>
                                        </div>
                            }
                        </div> : null
                }
            </div>
        </ClickAwayListener>
    )
}

export default HeaderSearch