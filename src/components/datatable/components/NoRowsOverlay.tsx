import SearchData from 'assets/lotties/search.json'
import Lottie from 'react-lottie'

const NoRowsOverlay = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SearchData
    }
    return (
        <div className="flex flex-col relative no-result text-center theme-base">
            <Lottie options={defaultOptions} />
            <h1 className='mb-2'>No Result Found</h1>
            <span className='m-0 text-grey-500'>Please Try Another Search</span>
        </div>
    )
}

export default NoRowsOverlay