import { ColDef } from "ag-grid-community"
import { useEffect, useState } from "react"
import DataTable from "components/datatable"
import ListHeader from "components/general/ListHeader"
import useListQuery from "hooks/useListQuery"
import moment from 'moment'
import { IconEdit } from '@tabler/icons'
import { useNavigate } from "react-router-dom"

const ListRequest = () => {
    const [rowData, setRowData] = useState<any[]>([])
    const [totalData, setTotalData] = useState(0)
    const [search, setSearch] = useState('')

    const { listQuery, setListQuery } = useListQuery()
    const navigate = useNavigate()

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
        {colId: 'creator_name', headerName: "Creator Name", field: "creator_name", filter: true, sortable: true},
        {colId: 'module', headerName: "Module", field: "module",},
        {colId: 'type', headerName: "Type", field: 'type', sortable: true, filter: true},
        {colId: 'created_at', headerName: "Created At", field: 'created_at', valueFormatter: (params) => moment(new Date(params.value)).format('YYYY-MM-DD')},
        {colId: 'reason', headerName: "Reason", field: 'reason'},
        {colId: 'aksi', headerName: "Aksi", headerClass: 'ag-header-text-center', width: 200, resizable: false, cellRenderer: (params:any) => {
            return (
                <div className="flex justify-center w-full h-full">
                    <button className="button-secondary-light border-solid border border-secondary-main rounded-full flex justify-center h-8 w-8 self-center" onClick={() => handleDetail(params)}>
                        <IconEdit stroke={1} className="self-center" width={16} />
                    </button>
                </div>
            )
        }},
    ]

    const handleDetail = (params:any) => {
        navigate('/form/request/' + params.data.id)
    }

    const initData = async () => {
        var payload:any = {
            ...listQuery,
        }

        for (var x in listQuery.filterModel) {
            payload[x] = listQuery.filterModel[x].filter
        }

        delete payload.filterModel
        var res:any = await global.$baseAxios.get('/internaluser/v1/approval', {params: payload})
        setRowData(res?.data)
        setTotalData(res?.total_data)
    }

    useEffect(() => {
        initData()
    }, [listQuery, setListQuery]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col theme-base rounded-main overflow-hidden">
            <ListHeader listQuery={listQuery} setListQuery={setListQuery} totalData={totalData} setSearch={setSearch} />
            <DataTable rowData={rowData} columnDefs={columnDefs} totalData={totalData} search={search} setListQuery={setListQuery} listQuery={listQuery} />
        </div>
    )
}

export default ListRequest