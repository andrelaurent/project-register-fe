import { useState, useEffect } from 'react'
import CustomCheckbox from "components/fields/Checkbox"


interface PermissionsProps {
    defaultData: any
}

const Permissions = (props:PermissionsProps) => {
    const { defaultData } = props
    const [permissions, setPermissions] = useState<any[]>([])

    useEffect(() => {
        handleData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleData = async () => {
        var res = await global.$baseAxios.get('/internaluser/v1/menu/permission/list')
        setPermissions(res?.data)
    }

    return (
        <table>
            <thead>
                <tr className="bg-primary-light text-grey-700">
                    <th align="left" className="p-3 text-sm font-light">Menu</th>
                    <th align="left" className="p-3 text-sm font-light">Permission</th>
                </tr>
            </thead>
            <tbody>
                {
                    permissions.map((permission:any, index:number) => {
                        return (
                            <tr className={"border border-solid border-t-0 border-r-0 border-l-0 " + (index === permissions.length - 1 ? 'border-b-0' : '')}>
                                <td width="200" className="text-xs text-grey-500 p-3">
                                    {permission.title}
                                    {
                                        Object.keys(permission).map((key:string) => {
                                            if (key !== 'endpoint')  return <input type="hidden" name={"permissions[" + index + "][" + key + "]"} value={permission[key]} />
                                            return null
                                        })
                                    }
                                </td>
                                <td>
                                    <div className="grid grid-cols-3 gap-5 p-3">
                                        {
                                            permission?.endpoint?.map((access:any) => {
                                                return <CustomCheckbox label={access.name ?? ''} name={'permissions[' + index + '][endpoint][]'} value={JSON.stringify(access)} defaultChecked={(defaultData?.endpoint_access?.findIndex((x:any) => x.id === access.id) >= 0)}  />
                                            })
                                        }
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }     
            </tbody>    
        </table>
    )
}

export default Permissions