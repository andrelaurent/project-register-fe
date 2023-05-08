import CustomTextField from "components/fields/TextField"
import Combobox from "components/fields/Combobox"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import useSerialize from "hooks/useSerialize"
import { useDispatch } from "react-redux"
import { SNACKBAR_ACTIVE } from "constants/actions"


import StickyComponent from "components/general/StickyComponent"
import { IconUserCheck } from '@tabler/icons'

import { Divider } from '@mui/material'
import CustomTextArea from "components/fields/CustomTextArea"
import Permissions from "./components/permissions"

const RoleForm = () => {
    const [role, setRole] = useState<any[]>([])
    const [defaultData, setDefaultData] = useState<any>({})
    const params = useParams()
    const serialize = useSerialize()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        handleData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleData = async () => {
        var res:any = await global.$baseAxios.get('/internaluser/v1/role', { params: { status: 'active' } })
        setRole(res?.data)
        if (params.id) {
            res = await global.$baseAxios.get(`/internaluser/v1/role/${params.id}`)
            setDefaultData(res.data)
        }
    }

    const handleSubmit = async (e:any) => {
        e?.preventDefault()

        const obj = serialize('save', { empty: false })
        obj.permissions = obj.permissions.filter((x:any) => x.endpoint)

        var endpoint_access:any[] = []
        var menu_access:any[] = []

        obj.permissions.map((x:any) => {
            endpoint_access = [...endpoint_access, ...x.endpoint]
            menu_access = [...menu_access, (({ endpoint, ...o }) => o)(x)]
            return ''
        })
        
        
        obj.details.old_data = defaultData
        obj.details.new_data.menu_access = menu_access
        obj.details.new_data.endpoint_access = endpoint_access
        delete obj.permissions

        var payload = {
            module: "internal_user",
            type: params.id ? 'update_role' : 'create_role',
            action: params.id ? "update" : "craete",
        }

        payload = {...obj, ...payload}

        try {
            await global.$baseAxios.post('/internaluser/v1/approval', payload)
            dispatch({type: SNACKBAR_ACTIVE, message: 'Selamat anda berhasil membuat data ini', snackbarType: 'success'})
            navigate(-1)
        } catch (err:any) {
            dispatch({type: SNACKBAR_ACTIVE, message: err?.message})
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
                                <h3 className="m-0">Role Information</h3>
                                <small>Add new user</small>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-end">
                            <button className="button-primary-main my-auto p-2 w-[120px]" type="submit" form="save">Submit</button>
                            <button type="button" className="button-border-primary my-auto p-2 w-[120px]" onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                </div>
            </StickyComponent>
            <form id="save" className="grid grid-cols-1 gap-4 container mx-auto pt-5 py-10 md:w-4/5 xl:w-3/5" onSubmit={handleSubmit}>
                <CustomTextField required label="Name" type='text' name="details[new_data][name]" defaultValue={defaultData?.name} />
                <Combobox name="details[new_data][parent_role]" hiddenField="details[new_data][parent_roleObj]" label="Parent Role" options={role} optionDisplay='name' optionValue="id" defaultValue={defaultData?.parent_role} />
                <CustomTextField type="text" label="Description" name="details[new_data][descriptions]" placeholder="write your description here..." defaultValue={defaultData?.descriptions} />
                <CustomTextArea label="Reason" name="reason" placeholder="write your reason here..." />
                <Divider className="my-2" />    
                <Permissions defaultData={defaultData} />
                <Divider className="my-2" />
                <div className="flex gap-5">
                    <button type="button" className="button-border-primary p-2 w-[120px]" onClick={() => navigate(-1)}>Back</button>
                    <button className="button-primary-main p-2 w-[120px]" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default RoleForm