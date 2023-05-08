import {AgGridReact} from 'ag-grid-react';
import { Pagination } from '@mui/material';
import { ColumnApi, GridApi } from 'ag-grid-community';
import React, { memo, useEffect, useState } from 'react';
import NoRowsOverlay from './components/NoRowsOverlay';
import SidebarDatatable from './components/SidebarDatatable';
import useCustomizeTheme from 'hooks/useCustomizeTheme';

interface DataTableProps {
    columnDefs: any[]
    rowData: any[]
    totalData: number
    search: string
    listQuery: any
    setListQuery: React.SetStateAction<any>
}

const paginationStyle = {
    '& button': {
        color: 'rgb(var(--theme-text-base))',
    },
    '& .Mui-selected': {
        background: 'rgb(var(--primary-main)) !important',
        color: 'white'
    }
}

const DataTable = (props:DataTableProps) => {
    const { theme } = useCustomizeTheme()

    const { columnDefs, rowData, totalData, search, listQuery, setListQuery } = props
    const [gridApi, setGridApi] = useState<GridApi>()
    const [columnApi, setColumnApi] = useState<ColumnApi>()
    const [columns, setColumns] = useState<any[]>([])
    const [openColumnSidebar, setOpenColumnSidebar] = useState(false)
    const defaultColDef = { 
        resizable: true, 
        filterParams: {
            buttons: ['reset', 'apply'],
            excelMode: 'windows',
            filterOptions: ["contains"],
            suppressAndOrCondition: true
        } 
    }

    const onGridReady = (params:any) => {
        setGridApi(params.api as GridApi)
        setColumnApi(params.columnApi as ColumnApi)
    }

    const handlePageChange = (event: React.ChangeEvent<unknown> | null, value: number) => {
        gridApi?.paginationGoToPage(value - 1)
        setListQuery({...listQuery, offset: (value - 1) * listQuery.limit, page: value})
    }

    console.log('datatable')

    const handleSearch = (value:string) => {
        gridApi?.showLoadingOverlay()
        gridApi?.setQuickFilter(value)
        gridApi?.hideOverlay()
        if (gridApi?.getDisplayedRowCount() === 0) {
            gridApi?.showNoRowsOverlay()
        }
    };

    useEffect(() => {
        setColumns(columnDefs)
        setTimeout(() => {
            gridApi?.sizeColumnsToFit()
        }, 300)
    }, [gridApi, rowData, columnDefs])


    // const initialColumn = () => {
    //     var temp = [...columnDefs]
    //     setColumns(temp.splice(0, 3))
    // }

    // const handleChangePaginationSize = (value:number) => {
    //     handlePageChange(null, 1)
    //     setListQuery({...listQuery, limit: value})
    //     gridApi?.paginationSetPageSize(value)
    // }
    
    useEffect(() => {
        handleSearch(search)
    }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

    const getRowClass = (params:any) => {
        if (params.node.rowIndex % 2 === 0) {
            return theme === 'white' ? '!bg-grey-100' : '!bg-grey-900'
        }
    }

    useEffect(() => {
        gridApi?.redrawRows()
    }, [theme])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log('set sort & filter', listQuery)
        gridApi?.setFilterModel(listQuery.filterModel)
        columnApi?.applyColumnState({
            state: [{ colId: listQuery.order_by, sort: listQuery.desc ? 'desc' : 'asc' }],
            defaultState: { sort: null },
        })
    }, [columnApi]) // eslint-disable-line react-hooks/exhaustive-deps

    // const handleExportCSV = () => {
    //     gridApi?.exportDataAsCsv({ columnKeys: ['1', '2', '3', '4'], fileName: 'table' })
    // }

    const onFilterChanged = (e:any) => {
        var _filterModel = e.api.getFilterModel()
        
        // ================================ validasi filter agar panggil api nya cuma sekali ============================= //
        if (JSON.stringify(_filterModel) === JSON.stringify(listQuery.filterModel)) return

        setListQuery({...listQuery, filterModel: _filterModel})
    }

    const handleOnSortChanged = (e:any) => {
        var _columnDefs = e.api.getColumnDefs()
        var sortModel = _columnDefs.find((a:any) => a.sort !== null)

        // ======================= validasi sorting agar panggil api nya cuma sekali ============================= //
        if (sortModel.colId === listQuery.order_by) {
            if (sortModel.sort === 'asc' && !listQuery.desc) return
            else if (sortModel.sort === 'desc' && listQuery.desc) return
        }


        setListQuery({...listQuery, order_by: sortModel.colId, desc: sortModel.sort === 'asc' ? null : true})
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="flex border border-solid border-t-0 border-r-0 border-l-0 h-[500px]">
                <div className='h-full w-full ag-theme-material'>
                    <AgGridReact
                        onGridReady={onGridReady}
                        paginationPageSize={listQuery.limit}
                        pagination={true}
                        suppressPaginationPanel={true}
                        defaultColDef={defaultColDef}
                        noRowsOverlayComponent={NoRowsOverlay}
                        columnDefs={columns}
                        rowData={rowData}
                        getRowClass={getRowClass}
                        onFilterChanged={onFilterChanged}
                        onSortChanged={handleOnSortChanged}
                        animateRows={true}
                        
                        icons={{
                            menu: '<i class="ti ti-align-justified text-xl text-theme-text-base"></i>',
                            filter: '<i class="ti ti-adjustments-horizontal text-lg text-theme-text-base"></i>',
                            sortAscending: '<i class="ti ti-sort-ascending text-lg text-theme-text-base"></i>',
                            sortDescending: '<i class="ti ti-sort-descending text-lg text-theme-text-base"></i>',
                        }}
                    >
                    </AgGridReact>
                </div>
                <SidebarDatatable open={openColumnSidebar} setOpen={setOpenColumnSidebar} gridApi={gridApi} columnDefs={columnDefs} columns={columns} setColumns={setColumns} />
            </div>
            <div className="py-4 px-2">
                <Pagination count={Math.ceil(totalData / listQuery.limit)} page={listQuery.page} onChange={handlePageChange} sx={paginationStyle} />
            </div>
        </div>
    )
}

export default memo(DataTable)