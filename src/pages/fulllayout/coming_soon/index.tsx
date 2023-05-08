import Lottie from 'react-lottie'
import Construction from 'assets/lotties/construction.json'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'

const ComingSoon = () => {
    const navigate = useNavigate()
    const [count, setCount] = useState(100)
    const timer = () => setCount(count - 1)

    const [duration, setDuration] = useState<any>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        handleDuration()
        if (count <= 0) {
            return
        }
        const id = setInterval(timer, 1000);
        return () => clearInterval(id)
    }, [count])  // eslint-disable-line react-hooks/exhaustive-deps


    const handleDuration = () => {
        let _duration = moment.duration(count, 'seconds')
        setDuration({
            days: _duration.days(),
            hours: _duration.hours(),
            minutes: _duration.minutes(),
            seconds: _duration.seconds()
        })
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Construction,
    }
    
    return (
        <div className='flex justify-center w-full h-full theme-base font-roboto'>
            <div className="self-center flex flex-col text-center sm:w-full md:w-4/5 lg:w-1/2 xl:w-2/5">
                <h1 className='m-0 h-fit'>Coming Soon</h1>
                <span className='text-center text-grey-500 w-3/5 mx-auto h-fit'>Something new is on it's way</span>
                <Lottie options={defaultOptions} height={document.body.clientHeight / 2 + 'px'} />
                <div className="grid grid-cols-4 sm:gap-3 md:gap-6 gap-3 sm:w-full md:w-4/5 w-full mx-auto sm:px-3 md:p-0 px-3">
                    <div className="bg-secondary-light bg-opacity-70 w-full flex justify-center py-3 rounded-lg">
                        <div className="self-center flex flex-col">
                            <h1 className='text-secondary-main m-0'>{duration.days < 10 ? '0' : ''}{duration.days.toString()}</h1>
                            <h5 className='m-0 text-secondary-main'>Days</h5>
                        </div>
                    </div>
                    <div className="bg-secondary-light bg-opacity-70 w-full flex justify-center py-3 rounded-lg">
                        <div className="self-center flex flex-col">
                            <h1 className='text-secondary-main m-0'>{duration.hours < 10 ? '0' : ''}{duration.hours.toString()}</h1>
                            <h5 className='m-0 text-secondary-main'>Hours</h5>
                        </div>
                    </div>
                    <div className="bg-secondary-light bg-opacity-70 w-full flex justify-center py-3 rounded-lg">
                        <div className="self-center flex flex-col">
                            <h1 className='text-secondary-main m-0'>{duration.minutes < 10 ? '0' : ''}{duration.minutes.toString()}</h1>
                            <h5 className='m-0 text-secondary-main'>Minutes</h5>
                        </div>
                    </div>
                    <div className="bg-secondary-light bg-opacity-70 w-full flex justify-center py-3 rounded-lg">
                        <div className="self-center flex flex-col">
                            <h1 className='text-secondary-main m-0'>{duration.seconds < 10 ? '0' : ''}{duration.seconds.toString()}</h1>
                            <h5 className='m-0 text-secondary-main'>Seconds</h5>
                        </div>
                    </div>
                </div>
                <div className="sm:px-3 md:px-0 px-3">
                    <div className="mt-5 sm:w-full md:w-4/5 w-full mx-auto border border-solid rounded-full p-2 overflow-hidden grid grid-cols-3 bg-grey-100">
                        <input type="text" className='col-span-2 text-grey-700 px-5 p-3 w-full bg-transparent' placeholder='email address' />
                        <button className='bg-primary-dark text-white hover:bg-primary-800 rounded-full w-full h-auto' onClick={() => navigate('/dashboard')}>Notify Me</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon