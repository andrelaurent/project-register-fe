import moment from 'moment'
import { IconInfoCircle } from '@tabler/icons'
import { Divider } from '@mui/material'
interface RequestSpecProps {
    data: any
}
const RequestSpec = (props:RequestSpecProps) => {
    const { data } = props
    return (
        <div className='grid grid-cols-1 gap-5'>
            <div className="flex gap-5 mt-5 text-secondary-main">
                <IconInfoCircle className='my-auto' />
                <h3 className='m-0'>Info</h3>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <small className='text-grey-500'>CREATOR</small>
                    <small>{data?.created_by_name}</small>
                </div>
                <div className="flex flex-col">
                    <small className='text-grey-500'>CREATED AT</small>
                    <small>{moment(new Date(data?.created_at)).format('YYYY-MM-DD')}</small>
                </div>
                <div className="flex flex-col">
                    <small className='text-grey-500'>MODULE</small>
                    <small>{data?.module?.split('_').join(' ')}</small>
                </div>
                <div className="flex flex-col">
                    <small className='text-grey-500'>TYPE</small>
                    <small>{data?.type?.split('_').join(' ')}</small>
                </div>
                <div className="flex flex-col">
                    <small className='text-grey-500'>REASON</small>
                    <small>{data?.reason}</small>
                </div>
            </div>
        </div>
    )
}

export default RequestSpec