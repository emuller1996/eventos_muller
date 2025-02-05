/* eslint-disable prettier/prettier */

import React, { useEffect, useRef } from 'react'
import { AreaSeries, BarSeries, BaselineSeries, createChart } from 'lightweight-charts';

const ChartSales30days = ({data}) => {
  const chartContainerRef = useRef(null)

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300, // Altura de la gráfica
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#e1e1e1' },
        horzLines: { color: '#e1e1e1' },
      },
    })
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    })

    /* const data = [
      { value: 0, time: 1642425322 },
      { value: 8, time: 1642511722 },
      { value: 10, time: 1642598122 },
      { value: 20, time: 1642684522 },
      { value: 3, time: 1642770922 },
      { value: 43, time: 1642857322 },
      { value: 41, time: 1642943722 },
      { value: 43, time: 1643030122 },
      { value: 56, time: 1643116522 },
      { value: 46, time: 1643202922 },
    ] */
    areaSeries.setData(data)

    chart.timeScale().fitContent()

    /* const areaSeries = chart.addSeries({
      topColor: 'rgba(33, 150, 243, 0.5)', // Color de área
      bottomColor: 'rgba(33, 150, 243, 0.0)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
    })

    areaSeries.setData([
      { time: '2024-02-01', value: 120 },
      { time: '2024-02-02', value: 125 },
      { time: '2024-02-03', value: 130 },
      { time: '2024-02-04', value: 110 },
      { time: '2024-02-05', value: 140 },
    ]) */

    return () => chart.remove()
  }, [])

  return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
}

export default ChartSales30days
