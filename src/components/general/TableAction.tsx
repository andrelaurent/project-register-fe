import { IconChevronDown } from '@tabler/icons'
import { useState } from 'react'
import { ClickAwayListener } from '@mui/material'

interface TableActionComponentProps {
    actions: any[]
    params: any[]
}
const TableActionComponent = (props:TableActionComponentProps) => {
    const { actions, params } = props
    const [open, setOpen] = useState(false)

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className='relative flex justify-center h-full'>
                <button className='self-center flex justify-center items-center gap-3 h-3/4  bg-primary-light border border-solid rounded-md bg-opacity-50 border border-solid border-primary-main w-full text-primary-main' onClick={() => setOpen(true)}>
                    Plih Aksi
                    <IconChevronDown stroke={1} className="my-auto" />
                </button>
                {
                    open ?
                        <div className="absolute left-0 top-[80%] w-full theme-base p-2 flex flex-col gap-2 rounded-main">
                            {
                                actions.map((item:any) => {
                                    return (
                                        <div className={'hover:bg-grey-300 hover:text-black rounded-main px-3 py-2 leading-none bg-opacity-80 ' + (item.show ? '' : 'hidden')} onClick={() => item.action(params)}>
                                            <span>{item.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div> : null
                }
            </div>
        </ClickAwayListener>
    )
}

export default TableActionComponent