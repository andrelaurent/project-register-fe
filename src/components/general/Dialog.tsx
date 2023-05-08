import { useSelector } from "react-redux"
import Lottie from 'react-lottie'
import Error from 'assets/lotties/error.json'
import Success from 'assets/lotties/successful.json'
import useSlot from "hooks/useSlot"

const DialogComponent = () => {
    const { status, resolve, reject } = useSelector((state:any) => state.dialog.awaitComponentData)
    const { dialogImage, title, description, childrenVar } = useSelector((state:any) => state.dialog.dialogCustomization)
    const showModal = status === "awaiting"
    const Slot = useSlot(childrenVar)

    const handleSubmit = () => {
        resolve(true)
    }

    const handleCancel = () => {
        reject({message: 'Anda membatalkan pembuatan data ini'})
    }

    if (!showModal) return null

    return (
        <div className={"fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10 flex justify-center animate-fade-in-down"}>
            <div className="self-center bg-white rounded-main sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 w-full p-10 px-16 flex flex-col">
                <Slot name="dialog-header"></Slot>
                <div className="w-3/5">
                    {
                        dialogImage && typeof dialogImage === 'string' ? 
                            <Lottie options={{loop: true, autoplay: true, animationData: dialogImage === 'success' ? Success : Error}} height="200px" /> : null
                    }
                    {
                        dialogImage && typeof dialogImage !== 'string' ?
                            <Lottie options={{loop: true, autoplay: true, animationData: dialogImage}} height="200px" /> : null
                    }
                </div>
                <Slot name="dialog-body">
                    <h1 className={"m-0 text-" + dialogImage + "-dark"}>{title?.toUpperCase()}</h1>
                    <p className="m-0 text-grey-500">{description}</p>
                </Slot>
                <Slot name="dialog-footer">
                    <div className="flex justify-start w-full pt-2">
                        <button className="button-primary-dark py-2 w-[100px]" onClick={handleSubmit}>OKE</button>
                        <div className="px-2"></div>
                        <button className="bg-grey-100 hover:bg-grey-200 text-primary-main py-2 w-[100px]" onClick={handleCancel}>KEMBALI</button>
                    </div>
                </Slot>
            </div>
        </div>
    )
}

export default DialogComponent