import CustomTextArea from "components/fields/CustomTextArea"
import useSerialize from "hooks/useSerialize"
import { useSelector } from "react-redux"


interface RejectedApprovalFormProps {
    slot?: string
}

export const RejectedApprovalForm = (props:RejectedApprovalFormProps) => {
    const serialize = useSerialize()
    const { resolve } = useSelector((state:any) => state.dialog.awaitComponentData)

    const handleSubmit = (e:any) => {
        e?.preventDefault()
        var obj = serialize('rejected')
        resolve(obj)
    }

    return (
        <div className="flex flex-col">
            <h1 className={"m-0 text-error-main"}>KONFIRMASI</h1>
            <p className="m-0 text-grey-500">Apakah anda yakin menolak approval ini</p>
            <div className="py-1"></div>
            <form id="rejected" onSubmit={handleSubmit}>
                <CustomTextArea required name="reason" inputClass="!h-[120px]" placeholder="write your reason here..." />
            </form>
        </div>
    )
}

interface RejectedApprovalFooterProps {
    slot?: string
}

export const RejectedApprovalFooter = (props:RejectedApprovalFooterProps) => {
    const { reject } = useSelector((state:any) => state.dialog.awaitComponentData)

    const handleCancel = () => {
        reject({message: 'Anda membatalkan pembuatan data ini'})
    }

    return (
        <div className="flex justify-start w-full pt-4">
            <button className="button-primary-dark py-2 w-[100px]" form="rejected" type="submit">SUBMIT</button>
            <div className="px-2"></div>
            <button className="bg-grey-100 hover:bg-grey-200 text-primary-main py-2 w-[100px]" onClick={handleCancel}>KEMBALI</button>
        </div>
    )
}