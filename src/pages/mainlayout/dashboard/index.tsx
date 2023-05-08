import CardLineChart from "components/apexchart_components/CardLineChart"
import { IconShoppingCart } from '@tabler/icons'
import ColumnChart from "components/apexchart_components/ColumnChart"
import AreaChart from "components/apexchart_components/AreaChart"

const Dashboard = () => {
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-7 gap-4'>
            <CardLineChart />
            <CardLineChart />
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:gap-4 lg:gap-7 gap-4">
                <div className="bg-primary-main flex rounded-main p-3 relative overflow-hidden">
                    <div className="absolute rounded-full w-[150px] h-[150px] top-[-85%] right-[-12%] bg-grey-50 bg-opacity-30 z-0"></div>
                    <div className="absolute rounded-full w-[150px] h-[150px] bottom-[-80%] right-[-20%] bg-grey-50 bg-opacity-30 z-0"></div>
                    <div className="bg-primary-dark text-white w-14 h-14 flex justify-center rounded-lg my-auto">
                        <IconShoppingCart className="self-center" />
                    </div>
                    <div className="px-2"></div>
                    <div className="flex flex-col my-auto">
                        <h4 className="text-white font-semibold m-0 text-lg">$203k</h4>
                        <small className="text-grey-300">Total Income</small>
                    </div>
                </div>
                
                <div className="theme-base flex rounded-main p-3 relative overflow-hidden">
                    <div className="absolute rounded-full w-[150px] h-[150px] top-[-85%] right-[-12%] bg-primary-light bg-opacity-30 z-0"></div>
                    <div className="absolute rounded-full w-[150px] h-[150px] bottom-[-80%] right-[-20%] bg-primary-light bg-opacity-30 z-0"></div>
                    <div className="bg-primary-light text-primary-dark w-14 h-14 flex justify-center rounded-lg my-auto">
                        <IconShoppingCart className="self-center" />
                    </div>
                    <div className="px-2"></div>
                    <div className="flex flex-col my-auto">
                        <h4 className="font-semibold m-0 text-lg">$203k</h4>
                        <small className="text-grey-500">Total Income</small>
                    </div>
                </div>
            </div>
            <div className="sm:col-span-1 md:col-span-2 theme-base p-5 rounded-main flex flex-col">
                <div className="flex flex-col">
                    <small className="text-grey-500">Total Growth</small>
                    <h3 className="m-0">$2,324.00</h3>
                </div>
                <div className="py-3"></div>
                <ColumnChart />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 theme-base p-5 rounded-main flex flex-col h-fit">
                <h3 className="m-0">Popular Stocks</h3>
                <div className="py-2"></div>
                <div className="bg-primary-light flex flex-col w-full rounded-lg">
                    <div className="flex justify-between w-full p-5 pb-0">
                        <div className="flex flex-col">
                            <span className="text-[16px] text-primary-800">Bajaj Finery</span>
                            <small>10% Profit</small>
                        </div>
                        <h3 className="mt-0">$1839.00</h3>
                    </div>
                    <AreaChart />
                </div>
            </div>
        </div>
    )
}

export default Dashboard