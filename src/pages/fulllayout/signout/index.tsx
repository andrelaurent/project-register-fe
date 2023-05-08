import Lottie from 'react-lottie'
import Construction from 'assets/lotties/construction.json'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
    const navigate = useNavigate()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Construction,
    }
    
    useEffect(() => {
        handleSignout()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSignout = async () => {
        await global.$baseAxios.get(`/internaluser/v1/user/${global.session.id}/logout`)
        localStorage.clear()
        navigate('/signin')
    }

    return (
        <div className='flex justify-center w-full h-full bg-white'>
            <div className="self-center sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 text-center">
                <h1 className='m-0 h-fit'>Thank you</h1>
                <span className='text-center text-grey-500 w-3/5 mx-auto h-fit'>Something new is on it's way</span>
                <Lottie options={defaultOptions} height={document.body.clientHeight / 2 + 'px'} />
            </div>
        </div>
    )
}

export default SignOut