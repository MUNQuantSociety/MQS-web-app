'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

// ApexCharts only works in the browser, so disable SSR
const ReactApexChart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)

type Metric = {
  timestamp: string
  nav: number
  notional: number
  open: number
  high: number
  low: number
  close: number
}

export default function Dashboard() {
  const [data, setData] = useState<Metric[]>([])

  // Poll every 5 seconds
  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch('/api/metrics')
      if (res.ok) setData(await res.json())
    }
    fetchMetrics()
    const id = setInterval(fetchMetrics, 5000)
    return () => clearInterval(id)
  }, [])

  // Notional series for charts
  const notionalSeries = [
    {
      name: 'Notional',
      data: data.map(pt => [new Date(pt.timestamp).getTime(), pt.notional]),
    },
  ]

  // Shared Apex options
  const sharedOptions: ApexOptions = {
    chart: {
      id: 'notional-chart',
      toolbar: { show: false },
      zoom: { enabled: true },
      animations: { enabled: true },
      foreColor: '#fff',
      background: 'transparent',
    },
    theme: { mode: 'dark' },
    grid: { borderColor: '#444' },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false },
      axisBorder: { color: '#666' },
    },
    yaxis: {
      title: { text: 'Notional (USD)', style: { color: '#fff' } },
      labels: { formatter: val => `$${val.toLocaleString()}` },
      axisBorder: { color: '#666' },
    },
    tooltip: {
      x: { format: 'dd MMM yyyy, HH:mm' },
      y: { formatter: val => `$${val.toLocaleString()}` },
    },
  }

  // Latest data for KPI cards
  const latest = data[data.length - 1] ?? { notional: 0, nav: 0, close: 0 }
  const initialCapital = 1_000_000
  const cards = [
    { title: 'ANALYTICS', value: 'Displays real-time fund metrics' },
    { title: 'Updated', value: `As of ${new Date(latest.timestamp).toLocaleTimeString()}` },
    {
      title: 'Current Valuation',
      value: (() => {
        const pnl = latest.nav - initialCapital
        const sign = pnl >= 0 ? '+' : '-'
        return `${sign}$${Math.abs(pnl).toLocaleString()}`
      })(),
    },
  ]

  return (
    <div className="m-6 bg-black p-6 space-y-6 rounded-lg">
      {/* KPI Cards */}
      <div className="flex flex-col lg:flex-row gap-4">
        {cards.map(({ title, value }) => (
          <div
            key={title}
            className="flex-1 border-2 border-[#B79A64] bg-[#293132] text-white p-4 rounded-lg flex flex-col justify-between"
          >
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Main Chart Container */}
      <div className="bg-[#293132] rounded-lg border-2 border-white shadow w-full h-80 overflow-hidden">
        <ReactApexChart
          options={sharedOptions}
          series={notionalSeries}
          type="line"
          width="100%"
          height="100%"
        />
      </div>

      {/* Two Smaller Charts: stack on small screens, side-by-side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#293132] rounded-lg border-2 border-white shadow w-full h-60 overflow-hidden">
          <ReactApexChart
            options={sharedOptions}
            series={notionalSeries}
            type="line"
            width="100%"
            height="100%"
          />
        </div>
        <div className="bg-[#293132] rounded-lg border-2 border-white shadow w-full h-60 overflow-hidden">
          <ReactApexChart
            options={sharedOptions}
            series={notionalSeries}
            type="line"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  )
}
