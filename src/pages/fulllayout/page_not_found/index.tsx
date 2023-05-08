import Lottie from 'react-lottie'
import PageNotFoundData from 'assets/lotties/404.json'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: PageNotFoundData,
    }

    return (
        <div className='flex justify-center w-full h-full theme-base font-roboto'>
            <div className="self-center flex flex-col text-center sm:w-full md:w-4/5 lg:w-1/2 xl:w-2/5">
                <Lottie options={defaultOptions} height={document.body.clientHeight / 2 + 'px'} />
                <h1 className='m-0 h-fit'>Something is wrong</h1>
                <span className='text-center text-grey-500 w-3/5 mx-auto h-fit'>The page you are looking was moved, removed, renamed, or might never exist!</span>
                <button className='button-primary-dark w-1/4 mx-auto p-2 mt-5' onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>
        </div>
    )
}

export default PageNotFound