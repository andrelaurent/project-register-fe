import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const AreaChart = () => {
    const [show, setShow] = useState(false)

    const options:ApexCharts.ApexOptions = {
        colors: ['#FB991C'],
        fill: {
            type: "gradient",
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 0.9,
                opacityTo: 0.2,
                stops: [0, 100]
            }
        },
        tooltip: {
            enabled: false
        },
        legend: {
            show: false
        },
        stroke: {
            curve: 'smooth',
            width: 1.8,
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
            padding: {
                right: 0,
                left: 0,
                bottom: 0,
                top: 0
            }
        },
        yaxis: {
            show: false,
        },
        xaxis: {
            labels: {
                show: false,
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
            parentHeightOffset: 0,
        }
      }

    
    const series:ApexAxisChartSeries = [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 50, 60]
        }
    ]

    useEffect(() => {
        setShow(true)
        console.log(show)
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    if (options) return (
        <div className="w-full">
            <Chart options={options} series={series} type="area" height='150' width="100%" />
        </div>
    )

    return null
}

export default AreaChart