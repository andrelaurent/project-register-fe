import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import HomeIcon from '@mui/icons-material/Home';
import ChevronRight from '@mui/icons-material/ChevronRight'
import { useLocation } from "react-router-dom";
import * as TablerIcon from '@tabler/icons'
import { useParams } from "react-router-dom";

const BreadCrumbs = () => {
    const location = useLocation()

    const menuOpen = useSelector((state:any) => state.customization.isOpen)
    const params = useParams()

    const [selectedMenu, setSelectedMenu] = useState<any>({})

    useEffect(() => {
        var _selectedMenu = global.session.role.menu_access.find((a:any) => a.id === menuOpen[0])
        setSelectedMenu(_selectedMenu)
    }, [menuOpen])

    return (
        <div className="theme-base p-5 rounded-main w-full flex justify-between md:flex-col lg:flex-row sm:flex-col flex-col">
            <h3 className="m-0 sm:text-2xl md:text-2xl lg:text-lg text-2xl">{location.pathname.split('/').slice(0, Object.keys(params).length === 0 ? location.pathname.split('/').length : -1).join(' ').toUpperCase()}</h3>
            <div className="sm:py-1 md:py-1 lg:py-0 py-1"></div>
            <div className="flex gap-2 text-[14px] !font-roboto select-none">
                <a href="/dashboard"  className="text-primary-dark my-auto">
                    <HomeIcon fontSize="medium" />
                </a>
                {
                    (() => {
                        const Icon = TablerIcon[selectedMenu?.icon as keyof typeof TablerIcon]
                        return selectedMenu?.icon ?
                            <div className="flex gap-2">
                                <div className="my-auto text-grey-500">
                                    <ChevronRight />
                                </div>
                                <a href={location.pathname === selectedMenu?.url ? null : selectedMenu?.url} className={"my-auto flex gap-2 " + (location.pathname === selectedMenu?.url ? 'text-grey-500' : '')}>
                                    <Icon  stroke={1.5} size="20px" className="my-auto" />
                                    {selectedMenu?.title}
                                </a>
                            </div> : null
                    })
                    ()
                }
                
                {
                    location.pathname !== selectedMenu?.url ?
                        <div className="flex gap-2">
                            <div className="my-auto text-grey-500">
                                <ChevronRight />
                            </div>
                            <a className="my-auto flex gap-2 text-grey-500 cursor-default" href="!#" onClick={(e) => e?.preventDefault()}>
                                {location.pathname.split('/').slice(0, Object.keys(params).length === 0 ? location.pathname.split('/').length : -1).join(' ')}
                            </a>
                        </div> : null
                }
            </div>
        </div>
    )

}

export default BreadCrumbs