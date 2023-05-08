import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import StickyComponent from "components/general/StickyComponent"
import { IconUserCheck, IconDetails, IconArrowRight } from '@tabler/icons'

import { Divider } from '@mui/material'
import RequestSpec from './components/request_spec'
import Permissions from 'pages/mainlayout/role/form/components/permissions'

const RequestForm = () => {
    const [data, setData] = useState<any>({})
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        handleData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleData = async () => {
        if (!params.id) navigate(-1)
        else {
            var res:any = await global.$baseAxios.get(`/internaluser/v1/approval/${params.id}/history`)
            setData(res?.data)
        }
    }

    return (
        <div className="theme-base rounded-main w-full">
            <StickyComponent>
                <div className="w-full flex justify-center py-4 border border-solid border-t-0 border-r-0 border-l-0">
                    <div className="container flex justify-between sm:flex-col md:flex-row flex-col gap-5">
                        <div className="flex gap-5">
                            <div className="bg-secondary-main text-white p-3 my-auto rounded-main">
                                <IconUserCheck />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="m-0">Pending Approval</h3>
                                <small>{data?.type?.split('_').join(' ')}</small>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <button type="button" className="button-border-primary my-auto p-2 w-[120px]" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                </div>
            </StickyComponent>
            <div className="grid grid-cols-1 gap-4 container mx-auto pt-5 py-10 md:w-4/5 xl:w-3/5">
                <RequestSpec data={data} />
                <div className="flex gap-5 mt-5 text-secondary-main">
                    <IconDetails className='my-auto' />
                    <h3 className='m-0'>Details</h3>
                </div>
                <Divider />
                {
                    data?.details?.new_data && data?.details?.old_data ? 
                        Object.keys(data.details.new_data).map((x:string) => {
                            var newData = data.details.new_data
                            var oldData = data.details.old_data

                            if (x.includes('Obj')) return null
                            else if (x === 'menu_access') return null
                            else if (x === 'endpoint_access') return null
                            
                            return (
                                <div className="flex flex-col gap-1">
                                    <small className='text-grey-500'>{x.toUpperCase()}</small>
                                    {
                                        (() => {
                                            if (typeof newData[x] === 'object') return null
                                            else if (newData[x] === oldData[x]) return <small>{newData[x]}</small>
                                            else if (newData[x] !== oldData[x]) return (
                                                <div className="flex gap-5">
                                                    {
                                                        oldData[x + '_name'] ?? oldData[x] ? 
                                                            <div className="flex gap-5">
                                                                <small className='my-auto'>{oldData[x + '_name'] ?? oldData[x]}</small>
                                                                <IconArrowRight stroke={1} />
                                                            </div> : null
                                                    }
                                                    <small className='my-auto'>{newData[x + 'Obj']?.['name'] ?? newData[x]}</small>
                                                </div>
                                            )
                                            else return null
                                        })
                                        ()
                                    }
                                </div>
                            )
                        }) : null
                }
                {
                    data?.details?.new_data?.endpoint_access ? 
                        <div className='flex flex-col gap-1'>
                            <small className='text-grey-500'>PERMISSIONS</small>
                            <Permissions defaultData={data.details.new_data} />
                        </div> : null
                }
            </div>
        </div>
    )
}

export default RequestForm