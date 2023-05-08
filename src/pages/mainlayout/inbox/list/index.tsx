import { ColDef } from "ag-grid-community"
import { useEffect, useState } from "react"
import DataTable from "components/datatable"
import ListHeader from "components/general/ListHeader"
import useListQuery from "hooks/useListQuery"
import { IconEdit } from "@tabler/icons"
import { useDispatch } from "react-redux"
import useAwaitDialog from "hooks/useAwaitDialog"
import { DIALOG_ACTIVE } from "constants/actions"
import Inbox from 'assets/lotties/inbox.json'
import { useNavigate } from "react-router-dom"

const ListInbox = () => {
    const [rowData, setRowData] = useState<any[]>([])
    
    const [totalData, setTotalData] = useState(0)
    const [search, setSearch] = useState('')

    const { listQuery, setListQuery } = useListQuery()
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { execute } = useAwaitDialog()

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
        {colId: 'creator', headerName: "Creator", field: "creator_name", width: 100, filter: true, sortable: true},
        {colId: 'title', headerName: "title", width: 150, field: "title",},
        {colId: 'message', headerName: "Message", field: 'message'},
        {colId: 'status', headerName: "Status", field: 'user_inbox_status', width: 100, headerClass: 'ag-header-text-center', cellStyle: {display: 'flex', justifyContent: 'center'}, cellRenderer: (params:any) => {
            if (params.value) return <div className="bg-success-main bg-opacity-30 border border-solid border-success-main rounded-full flex justify-center w-full py-2 leading-none self-center text-success-main">Read</div>
            return <div className="bg-error-main bg-opacity-30 border border-solid border-error-main rounded-full flex justify-center w-full py-2 leading-none self-center text-error-main">Unread</div>
        }},
        {colId: 'action', headerName: "Aksi", headerClass: 'ag-header-text-center', width: 100, resizable: false, cellStyle: {"overflow": 'visible'},  cellRenderer: (params:any) => {
            return (
                <div className="flex justify-center w-full h-full">
                    <button className="button-secondary-light border-solid border border-secondary-main rounded-full flex justify-center h-8 w-8 self-center" onClick={() => handleDetail(params)}>
                        <IconEdit stroke={1} className="self-center" width={16} />
                    </button>
                </div>
            )
        }},
    ]

    const handleDetail = async (params:any) => {
        await global.$baseAxios.get('/internaluser/v1/inbox/' + params.data.id + '/status')
        dispatch({ type: DIALOG_ACTIVE, dialogCustomization: { title: params.data.title, description: params.data.message, dialogImage: Inbox } })
        const confirm = await execute()
        if (confirm) navigate(params.data.routing)
    }

    const initData = async () => {
        var payload:any = {
            ...listQuery,
        }

        for (var x in listQuery.filterModel) {
            payload[x] = listQuery.filterModel[x].filter
        }

        delete payload.filterModel
        var res:any = await global.$baseAxios.get('/internaluser/v1/inbox', {params: payload})
        setRowData(res?.data)
        setTotalData(res?.total_data)
    }

    useEffect(() => {
        console.log('terjadi perubahan list query', listQuery)
        initData()
    }, [listQuery, setListQuery]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col theme-base rounded-main overflow-hidden">
            <ListHeader listQuery={listQuery} setListQuery={setListQuery} totalData={totalData} setSearch={setSearch} formLink={'/form/user'} />
            <DataTable rowData={rowData} columnDefs={columnDefs} totalData={totalData} search={search} setListQuery={setListQuery} listQuery={listQuery} />
        </div>
    )
}

export default ListInbox