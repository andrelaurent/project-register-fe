import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomTextField from 'components/fields/TextField';
import Combobox from 'components/fields/Combobox';
import { IconSearch } from '@tabler/icons'
interface ListHeaderProps {
    totalData: number
    setSearch: React.Dispatch<React.SetStateAction<string>>
    formLink?: string
    listQuery: any
    setListQuery: React.SetStateAction<any>
}

const ListHeader = (props:ListHeaderProps) => {
    const { totalData, setSearch, formLink, listQuery, setListQuery } = props
    const { permissions } = useSelector((state:any) => state.permission)

    const listRowsPerPage = [10, 20, 50, 100, 200, 1000]
    const navigate = useNavigate()

    const handleChangePaginationSize = (value:string) => {
        setListQuery({...listQuery, limit: parseInt(value), offset: 0, page: 1})
    }


    const handleInput = (value:string) => {
        setSearch(value)
    }

    return (
        <div className="flex flex-col w-full px-5 py-4 border border-solid">
            <div className="flex justify-between gap-3 sm:flex-col-reverse md:flex-row flex-col-reverse">
                <div className="flex gap-2 select-none text-[14px] my-auto">
                    <span className='my-auto'>Menampilkan</span>
                    <div className="w-[80px]">
                        <Combobox name="" label="" inputClass="!min-h-[42px] h-[42px]" options={listRowsPerPage} defaultValue={listQuery.limit} theme="2" themeCustomization='false' onChange={handleChangePaginationSize} />
                    </div>
                    <span className='my-auto w-max'>data dari {totalData} data</span>
                </div>
                {
                    permissions?.findIndex((a:any) => a.action === 'create') !== -1 && formLink ?
                        <>
                            <button className="button-primary-dark sm:w-1/3 md:w-1/6 w-1/3 h-[48px] text-sm" onClick={() => navigate(formLink)}>Tambah</button>
                        </> : null
                }
            </div>
            <div className="py-2"></div>
            <div className="flex gap-2">
                <div className="w-1/4">
                    <CustomTextField placeholder='quick search' type='text' name="search" theme="2" themeCustomization='false' onInput={handleInput}>
                        <div slot="preffix" className='flex flex-col justify-center px-2 text-grey-500'>
                            <IconSearch />
                        </div>
                    </CustomTextField>
                </div>
            </div>
        </div>
    )
}

export default ListHeader