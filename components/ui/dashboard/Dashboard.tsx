'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

// Disable SSR for ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// define your data shape
export type Metric = {
  timestamp: string
  notional: number
  nav: number
  open: number
  high: number
  low: number
  close: number
}

interface DashboardProps {
  initialData: Metric[]
}

export default function Dashboard({ initialData }: DashboardProps) {
  const data = initialData

  // series for notional vs time
  const notionalSeries = [
    {
      name: 'Notional',
      data: data.map((pt) => [new Date(pt.timestamp).getTime(), pt.notional]),
    },
  ]

  // chart look & feel with NO area fill, plus pan/zoom toolbar
  const sharedOptions: ApexOptions = {
    chart: {
      id: 'notional-chart',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
      pan: { enabled: true, type: 'x' },
      foreColor: '#fff',
    },
    theme: { mode: 'dark' },
    grid: { borderColor: '#444' },
    stroke: { curve: 'smooth', width: 2 },
    fill: { 
      type: 'solid',
      opacity: 0,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: { color: '#666' },
      labels: { datetimeUTC: false },
    },
    yaxis: {
      title: { text: 'Notional (USD)', style: { color: '#fff' } },
      labels: { formatter: (v) => `$${v.toLocaleString()}` },
      axisBorder: { color: '#666' },
    },
    tooltip: {
      x: { format: 'dd MMM yyyy, HH:mm' },
      y: { formatter: (v) => `$${v.toLocaleString()}` },
    },
  }

  return (
    <div className="m-6 bg-black p-6 space-y-6 rounded-lg">
      {/* KPI cards */}
      <div className="flex flex-col md:flex-row gap-4">
        {['Total Notional', 'NAV', 'P&L'].map((title) => (
          <div
            key={title}
            className="
              flex-1 border-2 border-[#B79A64]
              bg-[#293132] text-white p-4 rounded-lg
              flex flex-col justify-between
            "
          >
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-2xl font-bold">…</p>
          </div>
        ))}
      </div>

      {/* Full-width Notional chart */}
      <div className="bg-[#293132] rounded-lg border-2 border-white shadow w-full h-80 overflow-hidden">
        <ReactApexChart
          options={sharedOptions}
          series={notionalSeries}
          type="line"
          width="100%"
          height="100%"
        />
      </div>

      {/* Two smaller Notional charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[0,1].map((i) => (
          <div
            key={i}
            className="bg-[#293132] rounded-lg border-2 border-white shadow w-full h-60 overflow-hidden"
          >
            <ReactApexChart
              options={sharedOptions}
              series={notionalSeries}
              type="line"
              width="100%"
              height="100%"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
