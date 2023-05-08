import Chart from 'react-apexcharts'
import { IconShoppingCart } from '@tabler/icons'
import { useState } from 'react'
import useCustomizeTheme from 'hooks/useCustomizeTheme'

const CardLineChart = () => {
    const { theme } = useCustomizeTheme()
    const options:ApexCharts.ApexOptions = {
        colors: ['#fff'],
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false
        },
        legend: {
            show: false
        },
        yaxis: {
            show: false
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        chart: {
            toolbar: {
                show: false
            },
            offsetX: 0,
            offsetY: 0,
        }
    }
    
    const series:ApexAxisChartSeries = [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }
    ]

    const [filter, setFilter] = useState('month')

    return (
        <div className={'rounded-main p-3 pl-5 h-[220px] relative overflow-hidden grid grid-cols-5 gap-4 ' + (theme === 'dark' ? 'theme-base' : 'bg-primary-main')}>
            <div className="absolute rounded-full w-[200px] h-[200px] top-[-100px] right-[10%] bg-primary-dark bg-opacity-50 z-0"></div>
            <div className="absolute rounded-full w-[200px] h-[200px] top-[-30px] right-[-12%] bg-primary-dark z-0"></div>
            <div className="flex flex-col text-white justify-center col-span-2">
                <div className="bg-primary-dark p-3 w-min rounded-md flex justify-center">
                    <IconShoppingCart />
                </div>
                <div className="py-1"></div>
                <h1 className='m-0'>$961</h1>
                <span className="text-grey-200 font-light w-max">Total Order</span>
            </div>
            <div className="w-full col-span-3 flex flex-col h-full justify-between relative">
                <div className="flex justify-end text-white">
                    <button className={'p-2 bg-opacity-20 w-[100px] hover:bg-opacity-30 rounded-lg text-sm ' + (filter === 'month' ? 'bg-grey-50' : '')} onClick={() => setFilter('month')}>Month</button>
                    <div className="px-1"></div>
                    <button className={'p-2 bg-opacity-20 w-[100px] hover:bg-opacity-30 rounded-lg text-sm ' + (filter === 'year' ? 'bg-grey-50' : '')} onClick={() => setFilter('year')}>Year</button>
                </div>
                <div className="h-full">
                    <Chart options={options} series={series} type="line" height="100%" width="100%" />
                </div>
            </div>
        </div>
    )
}

export default CardLineChart