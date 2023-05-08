import { useEffect, useState } from 'react';
import { ClickAwayListener } from '@mui/material';
import { IconBell, IconThumbUp } from '@tabler/icons'
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment'
import Lottie from 'react-lottie'
import Inbox from 'assets/lotties/inbox.json'

import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const [show, setShow] = useState(false)
    const [inbox, setInbox] = useState([])
    const navigate = useNavigate()
    
    useEffect (() => {
        handleData()
    }, [])
    
    const handleData = async () => {
        const res:any = await global.$baseAxios.get('/internaluser/v1/inbox', { params: { offset: 0, limit: 10 } })
        setInbox(res?.data)
    }

    const handleNotificationRoute = async (message:any) => {
        await global.$baseAxios.get('/internaluser/v1/inbox/' + message.id)
        navigate(message.routing)
    }

    return (
        <ClickAwayListener onClickAway={() => setShow(false)}>
            <div className='my-auto relative'>
                <button className='button-secondary-light my-auto p-2'  onClick={() => setShow(!show)}>
                    <IconBell stroke={1.5} size="1.3rem" />
                </button>
                {
                    show ?
                        <div className="shadow-md theme-base absolute top-[110%] right-0 animate-fade-in-down rounded-main w-[400px] border border-solid font-roboto flex flex-col">
                            <div className="notification-title flex justify-center p-5 py-3 border border-solid border-t-0 border-r-0 border-l-0">
                                <h3 className='m-0'>Notification</h3>
                            </div>
                            <PerfectScrollbar
                                component="div"
                                style={{
                                    position: 'relative',
                                    maxHeight: '500px',
                                    flexDirection: 'column',
                                }}
                            >   
                                {
                                    inbox && inbox.length === 0 ? 
                                        <Lottie options={{loop: true, autoplay: true, animationData: Inbox}} height="200px" /> :
                                            inbox.map((message:any) => {
                                                return (
                                                    <div className='flex gap-3 py-4 px-3 border border-solid border-t-0 border-r-0 border-l-0 cursor-pointer select-none' onClick={() => handleNotificationRoute(message)}>
                                                        <div className="flex justify-center bg-primary-dark rounded-full min-w-[2.5rem] h-10 text-white">
                                                            <IconThumbUp className='self-center' />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="flex">
                                                                <p className='font-semibold m-0 text-sm'>{message.title}</p>
                                                                <div className="h-1 w-1 my-auto rounded-full bg-grey-200 mx-2"></div>
                                                                <small className='text-grey-500'>{moment(message?.updated_at).format('YYYY-MM-DD HH:mm:ss')}</small>
                                                            </div>
                                                            <p className='m-0 text-sm font-light'>{message.message}</p>
                                                            {
                                                                !message.user_inbox_status ? 
                                                                    <div className='bg-primary-light w-fit rounded-full px-3 mt-1'>
                                                                        <small className='text-grey-700'>Unread</small>
                                                                    </div> : null
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                }
                            </PerfectScrollbar>
                            {
                                inbox && inbox.length > 0 ? 
                                    <div className="notification-footer p-5 py-3 border border-solid border-b-0 border-r-0 border-l-0 flex justify-center">
                                        <button className='text-center' onClick={() => navigate('/list/inbox')}>See all</button>
                                    </div> : null
                            }
                        </div> : null
                }
            </div>
        </ClickAwayListener>
    )
}

export default Notification