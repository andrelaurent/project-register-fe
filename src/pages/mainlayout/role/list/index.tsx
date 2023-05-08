import { ColDef } from "ag-grid-community"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import DataTable from "components/datatable"
import ListHeader from "components/general/ListHeader"
import useListQuery from "hooks/useListQuery"
import TableActionComponent from "components/general/TableAction"
import useAwaitDialog from "hooks/useAwaitDialog"
import { DIALOG_ACTIVE } from "constants/actions"

const ListRole = () => {
    const [rowData, setRowData] = useState<any[]>([])
    
    const [totalData, setTotalData] = useState(0)
    const [search, setSearch] = useState('')

    const { permissions } = useSelector((state:any) => state.permission)

    const { listQuery, setListQuery } = useListQuery()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { execute } = useAwaitDialog()

    const handleEdit = (params:any) => {
        navigate(`/form/role/${params.data.id}`)
    }

    const actions = [
        {
            name: 'Edit',
            action: handleEdit,
            show: permissions.findIndex((a:any) => a.action === 'update') !== -1
        },
        {
            name: 'Activate',
            show: true,
            action: (data:any) => handleUpdate(data, true)
        },
        {
            name: 'Deactivate',
            show: true,
            action: (data:any) => handleUpdate(data, false)
        }
    ]

    const columnDefs:(ColDef)[] = [
        {
            colId: '0',
            headerName: "#",
            valueGetter: (params:any) => {
                return params.node.rowIndex + 1 + listQuery.offset
            },
            width: 50,
            lockPosition: 'left',
            maxWidth: 70,
        },
        {colId: 'name', headerName: "Name", field: "name", filter: true, sortable: true},
        {colId: 'descriptions', headerName: "Description", field: 'descriptions'},
        {colId: 'action', headerName: "Aksi", headerClass: 'ag-header-text-center', width: 200, resizable: false, cellStyle: {"overflow": 'visible'},  cellRenderer: (params:any) => {
            return <TableActionComponent actions={actions} params={params} />
        }},
    ]

    
    const handleUpdate = async (data:any, hide:boolean) => {
        dispatch({ type: DIALOG_ACTIVE, dialogCustomization: { title: 'Konfirmasi', dialogImage: hide ? 'success' : 'error', description: 'Apakah anda yakin untuk mengubah ' +  data.data.name + ' show status menjadi ' + hide.toString() } })
        const confirm = await execute()
        if (!confirm) return
        
        var payload = {
            module: "internal_user",
            type: 'update_role',
            action: "update",
            reason: 'merubah show status ' + data.data.name + ' menjadi ' + hide.toString(),
            details: {
                old_data: data.data,
                new_data: {...data.data, hide: hide}
            }
        }

        await global.$baseAxios.post('/internaluser/v1/approval', payload)
    }


    const initData = async () => {
        var payload:any = {
            ...listQuery,
        }

        for (var x in listQuery.filterModel) {
            payload[x] = listQuery.filterModel[x].filter
        }

        delete payload.filterModel
        var res:any = await global.$baseAxios.get('/internaluser/v1/role', {params: payload})
        setRowData(res?.data)
        setTotalData(res?.total_data)
    }

    useEffect(() => {
        console.log('terjadi perubahan list query', listQuery)
        initData()
    }, [listQuery, setListQuery]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col theme-base rounded-main overflow-hidden">
            <ListHeader listQuery={listQuery} setListQuery={setListQuery} totalData={totalData} setSearch={setSearch} formLink={'/form/role'} />
            <DataTable rowData={rowData} columnDefs={columnDefs} totalData={totalData} search={search} setListQuery={setListQuery} listQuery={listQuery} />
        </div>
    )
}

export default ListRole