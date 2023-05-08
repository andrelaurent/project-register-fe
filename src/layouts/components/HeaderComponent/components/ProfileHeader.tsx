import UserRound from 'assets/svg/users/user-round.svg'
import { IconSettings } from '@tabler/icons';
import { useState } from 'react';
import { Divider, List, ClickAwayListener } from '@mui/material';
import NavItem from 'layouts/components/SidebarComponent/components/NavItem';
import { listButtonStyle } from 'layouts/components/SidebarComponent/constant';
import BorderRadiusCustomization from 'components/customization/BorderRadiusCustomization';
import ThemeCustomization from 'components/customization/ThemeCustomization';
import FieldCustomization from 'components/customization/FieldCustomization';

const ProfileHeader = () => {
    const [show, setShow] = useState(false)

    const profileMenu = [
        {
            title: 'Change Password',
            icon: 'IconLock',
            url: '/change-password'
        },
        {
            title: 'Logout',
            icon: 'IconLogout',
            url: '/signout'
        },
    ]

    return (
        <ClickAwayListener onClickAway={() => setShow(false)}>
            <div className='my-auto relative'>
                <button className='!rounded-[27px] button-primary-light p-2 px-3 my-auto flex w-max' onClick={() => setShow(!show)}>
                    <img src={UserRound} alt="" />
                    <div className="px-2"></div>
                    <div className="my-auto">
                        <IconSettings stroke={1.5} size="1.3rem" />
                    </div>
                </button>
                {
                    show ?
                        <div className="shadow-md theme-base absolute top-[110%] p-5 right-0 animate-fade-in-down rounded-main w-[350px] border border-solid font-roboto flex flex-col">
                            <span className=''>
                                <b>Welcome back</b>, {global.session.name}
                            </span>
                            <small className='text-grey-500'>{global.session.role.name}</small>
                            <Divider className='border-grey-200 my-3' />
                            <div className="bg-primary-light bg-opacity-80 rounded-main">
                                <FieldCustomization />
                                <Divider />
                                <ThemeCustomization />
                                <Divider />
                                <BorderRadiusCustomization />
                            </div>
                            <Divider className='border-grey-200 my-3' />
                            <List disablePadding>
                                {
                                    profileMenu.map((item:any) => <NavItem listButtonStyle={listButtonStyle} item={item} handleClick={() => null} selected={['']} />)
                                }
                            </List>
                        </div> : null
                }
            </div>
        </ClickAwayListener>
    )
}

export default ProfileHeader