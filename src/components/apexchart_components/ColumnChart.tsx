import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
const ColumnChart = () => {
    const [show, setShow] = useState(false)

    const options:ApexCharts.ApexOptions = {
        colors: ['#EDE7F6', '#B39DDB', '#673AB7', '#5E35B1', '#4527A0'],
        chart: {
            width: '100%',
            stacked: true,
            toolbar: {
                show: false
            },
            offsetX: 0,
            offsetY: 0,
        },
        stroke: {
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
            },
        },
        
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
        },
        legend: {
            position: 'bottom',
            markers: {
                radius: 4,
                width: 16,
                height: 16,
            },
            itemMargin: {
                vertical: 12
            },
            containerMargin: {
                left: 0,
            }
        },
    }

    
    const series:ApexAxisChartSeries = [
        {
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
        }, 
        {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27]
        }, 
        {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14]
        }, 
        {
            name: 'PRODUCT D',
            data: [21, 7, 25, 13, 22, 8]
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
            console.log(show)
        }, 500)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (options) return (
        <div className="w-full overflow-hidden">
            <Chart series={series} options={options} type="bar" height="500" />
        </div>
    )

    return null
}

export default ColumnChart