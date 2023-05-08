
import { useSelector, useDispatch } from "react-redux";
import LogoSection from "../LogoSection";
import { SET_MENU } from '../../../constants/actions'
import MenuList from "./components/MenuList";

const SidebarComponent = () => {
    const dispatch = useDispatch()
    const leftDrawerOpen = useSelector((state:any) => state.customization.opened)

    return (
        <div className={"sidebar " + (leftDrawerOpen ? '' : 'w-0')}>
            {
                leftDrawerOpen ? 
                    <div className="sm:fixed md:fixed lg:relative fixed md:flex lg:hidden flex lg:w-min md:w-full sm:w-full w-full bg-black h-full left-0 top-0 bg-opacity-20" onClick={() => dispatch({ type: SET_MENU, opened: false })}></div> : null
            }
            {
                leftDrawerOpen ?
                    <div className="p-[16px] h-[5rem] lg:hidden md:flex sm:flex flex border border-solid border-t-0 border-r-0 border-l-0 theme-base relative">
                        <LogoSection />
                    </div> : null
            }
            <MenuList />
        </div>
    )
}

export default SidebarComponent