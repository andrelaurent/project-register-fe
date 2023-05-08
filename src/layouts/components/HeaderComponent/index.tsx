import LogoSection from '../../components/LogoSection'
import { IconMenu2, IconLanguageKatakana } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux'
import { SET_MENU } from '../../../constants/actions'
import HeaderSearch from './components/HeaderSearch'
import ProfileHeader from './components/ProfileHeader';
import Notification from './components/Notification';

const HeaderComponent = () => {
    const dispatch = useDispatch()
    const leftDrawerOpen = useSelector((state:any) => state.customization.opened)

    const handleDrawer = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpen })
        console.log('leftDrawerOpen', leftDrawerOpen)
    }

    return (
        <div className="fixed theme-base top-0 left-0 w-full flex justify-between gap-4 h-[5rem] px-[16px] shadow z-[2]">
            <div className="flex gap-10">
                <div className="flex justify-between w-[24rem]">
                    <div className="sm:hidden md:hidden lg:flex hidden">
                        <LogoSection />
                    </div>
                    <button className='button-secondary-main rounded-main my-auto p-2' onClick={handleDrawer}>
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </button>
                </div>
                <HeaderSearch />
            </div>
            <div className='flex'>
                <button className='button-primary-light my-auto p-2'>
                    <IconLanguageKatakana stroke={1.5} size="1.3rem" />
                </button>
                <div className="px-2"></div>
                <Notification />
                <div className="px-3"></div>
                <ProfileHeader />
            </div>
        </div>
    )
}

export default HeaderComponent