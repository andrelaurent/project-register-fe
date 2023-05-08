import { GridApi } from "ag-grid-community"
import { IconColumns } from '@tabler/icons'
import { Divider } from '@mui/material'
import { IconInfoCircle } from '@tabler/icons'
import { useEffect } from 'react'
import { ClickAwayListener } from '@mui/material'

interface SidebarDatatableProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    columns: any[]
    setColumns: React.Dispatch<React.SetStateAction<any[]>>
    columnDefs: any[]
    gridApi: GridApi<any> | undefined
}

const SidebarDatatable = (props:SidebarDatatableProps) => {
    const { open, columns, columnDefs, setColumns, gridApi, setOpen } = props

    useEffect(() => {
        gridApi?.resetRowHeights()
    }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleChangeColumn = (event:any) => {
        var temp = [...columns]
        var value = event.target.value
        var checked = event.target.checked

        var indexColDefs = columnDefs.findIndex(x => x.colId === value)
        var indexColumns = temp.findIndex(x => x.colId === value)
        console.log(indexColDefs, indexColumns)
        if (!checked) temp.splice(indexColumns, 1)
        else temp.push(columnDefs[indexColDefs])
        setColumns(temp)
        setTimeout(() => {
            gridApi?.sizeColumnsToFit()
        }, 100)
    }

    
    const handleCheckAllColumn = (event:any) => {
        console.log(event.target.checked)
        var checked = event.target.checked
        if (!checked) setColumns([])
        else setColumns(columnDefs)
    }
    

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className="flex">
                <div className={"theme-base flex flex-col transition-all duration-200 overflow-hidden " + (open ? 'w-[280px] p-3' : 'w-0')}>
                    <div className="bg-primary-light bg-opacity-70 p-3 rounded-md font-roboto flex gap-3">
                        <IconInfoCircle width={40} stroke={1} />
                        <div className="flex flex-col">
                            <h4 className="m-0">Column</h4>
                            <span className="text-sm text-grey-700">Anda dapat mengatur column yang akan di tampilkan disini</span>
                        </div>
                    </div>
                    <div className="py-1"></div>
                    <label className='flex gap-3 text-xs text-grey-500 py-2'>
                        <input type="checkbox" checked={columns.length === columnDefs.length} onChange={handleCheckAllColumn} />
                        <span className="my-auto">Select All</span>
                    </label>
                    <Divider className="border-grey-300 my-2" />
                    {
                        columnDefs.map((column:any, n:number) => {
                            return (
                                <label className='flex py-2 gap-3 text-xs text-grey-500 items-center' key={n}>
                                    <input type="checkbox" checked={columns.findIndex(x => x.colId === column.colId) !== -1} value={column.colId} onChange={handleChangeColumn} />
                                    {column.headerName}
                                </label>
                            )
                        })
                    }
                </div>
                <div className="h-full border border-solid border-t-0 border-b-0 border-grey-500 theme-base py-20 w-[50px] flex justify-center z-1 relative">
                    <button className={'flex rotate-90 h-fit hover:text-primary-main ' + (open ? 'text-primary-main' : '')} onClick={() => setOpen(!open)}>
                        <IconColumns stroke={1.5} size="1.2rem" />
                        <div className="px-1"></div>
                        Column
                    </button>
                </div>
            </div>
        </ClickAwayListener>
    )
}

export default SidebarDatatable