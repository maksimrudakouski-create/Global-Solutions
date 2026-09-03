import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useState } from 'react'

const lime = '#b9f34a'
const teal = '#55b8c6'

const dateRanges = {
  7: { label: 'Last 7 Days', range: 'Mar 15 - Mar 21, 2023', multiplier: 0.16, points: 6, costMultiplier: 1.08 },
  30: { label: 'Last 30 Days', range: 'Feb 20 - Mar 21, 2023', multiplier: 0.48, points: 12, costMultiplier: 1.03 },
  90: { label: 'Last 90 Days', range: 'Dec 22, 2022 - Mar 21, 2023', multiplier: 1, points: 24, costMultiplier: 1 },
} as const

const channelData = [
  { name: 'Display', tam: 7200, business: 37800 },
  { name: 'Paid Search', tam: 5100, business: 29000 },
  { name: 'Paid Social', tam: 9000, business: 23000 },
  { name: 'Video', tam: 9000, business: 22000 },
  { name: 'PR/AR', tam: 8200, business: 21000 },
  { name: 'Email', tam: 8800, business: 19700 },
  { name: 'Organic Search', tam: 9000, business: 19000 },
  { name: 'Organic Social', tam: 5900, business: 20100 },
  { name: 'Referral', tam: 5400, business: 15000 },
  { name: 'Direct', tam: 8300, business: 9100 },
  { name: 'Unrecognized', tam: 5700, business: 2200 },
]

const costData = [
  { name: 'Display', tam: 76.13, business: 3.05 },
  { name: 'Paid Search', tam: 16.72, business: 5 },
  { name: 'Paid Social', tam: 16.72, business: 5 },
  { name: 'Video', tam: 16.72, business: 5 },
  { name: 'PR/AR', tam: 16.72, business: 5 },
  { name: 'Email', tam: 16.72, business: 5 },
  { name: 'Organic Search', tam: 14.44, business: 3.18 },
  { name: 'Organic Social', tam: 11.65, business: 0.25 },
  { name: 'Organic video', tam: 10.26, business: 2.38 },
  { name: 'Referral', tam: 4.25, business: 2.62 },
  { name: 'Direct', tam: 2.61, business: 0.38 },
  { name: 'Unrecognized', tam: 1.09, business: 0.35 },
]

const totalVisitsData = [
  { date: '12/20', tam: 15, business: 65 }, { date: '12/23', tam: 17, business: 73 }, { date: '12/26', tam: 24, business: 69 }, { date: '12/29', tam: 21, business: 70 },
  { date: '1/1', tam: 24, business: 74 }, { date: '1/4', tam: 21, business: 71 }, { date: '1/7', tam: 24, business: 72 }, { date: '1/10', tam: 23, business: 73 },
  { date: '1/13', tam: 24, business: 66 }, { date: '1/17', tam: 22, business: 73 }, { date: '1/20', tam: 18, business: 73 }, { date: '1/24', tam: 20, business: 76 },
  { date: '1/27', tam: 27, business: 78 }, { date: '1/31', tam: 32, business: 76 }, { date: '2/3', tam: 45, business: 73 }, { date: '2/7', tam: 54, business: 81 },
  { date: '2/10', tam: 53, business: 78 }, { date: '2/14', tam: 55, business: 83 }, { date: '2/17', tam: 54, business: 79 }, { date: '2/21', tam: 57, business: 84 },
  { date: '2/24', tam: 53, business: 82 }, { date: '2/28', tam: 50, business: 79 }, { date: '3/3', tam: 54, business: 85 }, { date: '3/7', tam: 53, business: 81 },
]

const vendorData = [
  { channel: 'Organic', vendor: 'Google', cost: 5, tam: 950, business: 32388 },
  { channel: 'Paid Search', vendor: 'Google', cost: 71.65, tam: 620, business: 14973 },
  { channel: 'Video', vendor: 'Youtube', cost: 2.05, tam: 1420, business: 11580 },
  { channel: 'Paid Social', vendor: 'LinkedIn', cost: 7.95, tam: 5100, business: 7007 },
  { channel: 'Email', vendor: 'Marketo', cost: 1.09, tam: 2900, business: 5665 },
  { channel: 'Referral', vendor: 'TLC Comm', cost: 29.76, tam: 430, business: 7970 },
  { channel: 'Display', vendor: 'Demandbase', cost: 3.78, tam: 4500, business: 1415 },
  { channel: 'Organic', vendor: 'Bing', cost: 14.16, tam: 380, business: 5503 },
  { channel: 'Paid Search', vendor: 'Bing', cost: 40.6, tam: 250, business: 2502 },
  { channel: 'AR', vendor: 'Gartner', cost: 22.1, tam: 130, business: 2510 },
  { channel: 'AR', vendor: 'Forrester', cost: 18.52, tam: 140, business: 1660 },
  { channel: 'Paid Social', vendor: 'Facebook', cost: 35.3, tam: 90, business: 1387 },
  { channel: 'AR', vendor: 'G2', cost: 28.12, tam: 70, business: 1167 },
  { channel: 'Social', vendor: 'TikTok', cost: 63.55, tam: 50, business: 688 },
  { channel: 'Social', vendor: 'Instagram', cost: 83.77, tam: 55, business: 645 },
  { channel: 'Display', vendor: 'AdRoll', cost: 71.23, tam: 48, business: 537 },
]

const trendsData = [
  { month: 'Jul', returnSpend: 3.6, cost: 4300 }, { month: 'Aug', returnSpend: 3.3, cost: 4250 }, { month: 'Sep', returnSpend: 3.4, cost: 4000 },
  { month: 'Oct', returnSpend: 3.0, cost: 4100 }, { month: 'Nov', returnSpend: 2.7, cost: 4200 }, { month: 'Dec', returnSpend: 2.9, cost: 4400 }, { month: 'Jan', returnSpend: 2.5, cost: 4300 },
]

const returnSpendData = [
  { channel: 'Display', ros: 4.5 }, { channel: 'Referral', ros: 4.2 }, { channel: 'Organic Search', ros: 4 }, { channel: 'Paid Search', ros: 2.1 },
  { channel: 'PR', ros: 1.2 }, { channel: 'Paid Social', ros: 0.5 }, { channel: 'Video', ros: 0.1 },
]

const pipelineData = [
  { channel: 'Display', influenced: 450000, spend: 100000 }, { channel: 'Referral', influenced: 420000, spend: 100000 }, { channel: 'Organic Search', influenced: 8000, spend: 2000 },
  { channel: 'Paid Search', influenced: 210000, spend: 100000 }, { channel: 'PR', influenced: 6000, spend: 5000 }, { channel: 'Paid Social', influenced: 1000, spend: 2000 }, { channel: 'Video', influenced: 5000, spend: 100000 },
]

const influenceData = [
  { vendor: 'Google - SEO', channel: 'Organic', opportunity: 93, pipeline: 98 }, { vendor: 'Marketo', channel: 'Paid Search', opportunity: 90, pipeline: 90 },
  { vendor: 'LinkedIn', channel: 'Video', opportunity: 87, pipeline: 89 }, { vendor: 'Forrester', channel: 'Display', opportunity: 62, pipeline: 73 },
  { vendor: 'Gartner', channel: 'Organic', opportunity: 43, pipeline: 54 }, { vendor: 'Demandbase', channel: 'Paid Search', opportunity: 33, pipeline: 43 },
  { vendor: 'Youtube', channel: 'AR', opportunity: 33, pipeline: 45 }, { vendor: 'G2', channel: 'AR', opportunity: 23, pipeline: 43 },
  { vendor: 'Bing - SEO', channel: 'AR', opportunity: 19, pipeline: 23 }, { vendor: 'TLC Comm', channel: 'Paid Search', opportunity: 18, pipeline: 23 },
  { vendor: 'Google - SEM', channel: 'Organic', opportunity: 14, pipeline: 18 }, { vendor: 'AdRoll', channel: 'Display', opportunity: 13, pipeline: 14 },
  { vendor: 'Bing - SEM', channel: 'Video', opportunity: 10, pipeline: 13 }, { vendor: 'Facebook Ads', channel: 'Organic', opportunity: 8, pipeline: 10 },
  { vendor: 'TikTok', channel: 'Display', opportunity: 5, pipeline: 8 }, { vendor: 'Instagram', channel: 'Search', opportunity: 0, pipeline: 5 },
]

function Metric({ label, value }: { label: string; value: string }) {
  return <article className="metric-card"><p>{label}</p><strong>{value}</strong></article>
}

function Legend({ label, color }: { label: string; color: string }) {
  return <span className="legend-item"><i style={{ backgroundColor: color }} />{label}</span>
}

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const datum = payload[0].payload as { name: string; tam: number; business: number }
  return (
    <div className="chart-tooltip">
      <strong>{datum.name}:</strong>
      <span><i style={{ backgroundColor: lime }} />TAM Visits:<b>{datum.tam.toLocaleString()}</b></span>
      <span><i style={{ backgroundColor: teal }} />Business Visits:<b>{datum.business.toLocaleString()}</b></span>
    </div>
  )
}

function CostTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const datum = payload[0].payload as { name: string; tam: number; business: number }
  return (
    <div className="chart-tooltip">
      <strong>{datum.name}:</strong>
      <span><i style={{ backgroundColor: lime }} />$ Per TAM Visit:<b>${datum.tam.toFixed(2)}</b></span>
      <span><i style={{ backgroundColor: teal }} />$ Per Business Visit:<b>${datum.business.toFixed(2)}</b></span>
    </div>
  )
}

function TotalVisitsTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const datum = payload[0].payload as { date: string; tam: number; business: number }
  return (
    <div className="chart-tooltip total-tooltip">
      <strong>{datum.date}</strong>
      <span><i style={{ backgroundColor: lime }} />TAM Visits:<b>{datum.tam}</b></span>
      <span><i style={{ backgroundColor: teal }} />Business Visits:<b>{datum.business}</b></span>
      <em>All Visits:<b>{datum.tam + datum.business}</b></em>
    </div>
  )
}

function VendorTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const datum = payload[0].payload as typeof vendorData[number]
  return (
    <div className="chart-tooltip">
      <strong>{datum.vendor}:</strong>
      <span><i style={{ backgroundColor: lime }} />TAM Visits:<b>{datum.tam.toLocaleString()}</b></span>
      <span><i style={{ backgroundColor: teal }} />Business Visits:<b>{datum.business.toLocaleString()}</b></span>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="chart-card" aria-label={title}><h2>{title}</h2>{children}</section>
}

function CategoryTick({ x, y, payload }: any) {
  return <text x={x} y={y} dy={4} textAnchor="end" fill="#202226" fontSize={11}>{payload.value}</text>
}

function DashboardTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const datum = payload[0].payload ?? {}
  const title = datum.date ?? datum.month ?? datum.name ?? datum.vendor ?? label ?? ''
  const format = (value: number, name: string) => {
    const key = name.toLowerCase()
    if (key.includes('return') || key === 'ros') return `${value}x`
    if (key.includes('influence')) return `${value}%`
    if (key.includes('cost') || key.includes('$') || key.includes('spend')) return `$${value.toLocaleString()}`
    return value.toLocaleString()
  }

  return (
    <div className="chart-tooltip unified-tooltip">
      <strong>{title}</strong>
      {payload.map((entry: any, index: number) => <span key={`${entry.name}-${index}`}><i style={{ backgroundColor: entry.color ?? entry.fill ?? lime }} />{entry.name}:<b>{format(Number(entry.value), String(entry.name))}</b></span>)}
    </div>
  )
}

function VendorTable({ data }: { data: Array<typeof vendorData[number]> }) {
  return (
    <section className="table-card" aria-label="Visits and cost per visit by vendor">
      <h2>Visits and $ per Visit by Vendor</h2>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Channel</th><th>Vendor</th><th>Business Visits</th><th>$ per Business Visit</th><th>TAM Visits</th><th>$ per TAM Visit</th></tr></thead>
          <tbody>{data.map((item, index) => <tr key={`${item.vendor}-${item.channel}-${index}`}><td>{item.channel}</td><td>{item.vendor}</td><td>{item.business.toLocaleString()}</td><td>${(item.cost / Math.max(item.business / 1000, 1)).toFixed(2)}</td><td>{item.tam.toLocaleString()}</td><td>${item.cost.toFixed(2)}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

function DataTableCard({ title, columns, rows }: { title: string; columns: string[]; rows: Array<Array<string | number>> }) {
  return (
    <section className="table-card" aria-label={title}>
      <h2>{title}</h2>
      <div className="table-scroll"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>
        {rows.map((row, index) => <tr key={`${title}-${index}`}>{row.map((value, cell) => <td key={cell}>{value}</td>)}</tr>)}
      </tbody></table></div>
    </section>
  )
}

export default function App() {
  const [days, setDays] = useState<keyof typeof dateRanges>(90)
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')
  const selectedRange = dateRanges[days]
  const visibleChannelData = channelData.map((item) => ({
    ...item,
    tam: Math.round(item.tam * selectedRange.multiplier),
    business: Math.round(item.business * selectedRange.multiplier),
  }))
  const visibleCostData = costData.map((item) => ({
    ...item,
    tam: Number((item.tam * selectedRange.costMultiplier).toFixed(2)),
    business: Number((item.business * selectedRange.costMultiplier).toFixed(2)),
  }))
  const visibleTotalVisitsData = totalVisitsData.slice(-selectedRange.points)
  const visibleVendorData = vendorData.map((item) => ({
    ...item,
    tam: Math.round(item.tam * selectedRange.multiplier),
    business: Math.round(item.business * selectedRange.multiplier),
  }))
  const visibleTrendsData = trendsData.slice(-(days === 7 ? 2 : days === 30 ? 4 : trendsData.length)).map((item) => ({
    ...item,
    // Cost per opportunity is a rate, so it stays comparable across periods.
    cost: item.cost,
  }))
  const visibleReturnSpendData = returnSpendData.map((item) => ({ ...item, ros: Number((item.ros * selectedRange.costMultiplier).toFixed(1)) }))
  const visiblePipelineData = pipelineData.map((item) => ({
    ...item,
    influenced: Math.round(item.influenced * selectedRange.multiplier),
    spend: Math.round(item.spend * selectedRange.multiplier),
  }))
  const compactNumber = (value: number) => Math.round(value).toLocaleString()
  const totalVisits = visibleChannelData.reduce((sum, item) => sum + item.tam + item.business, 0)
  const tamVisits = visibleChannelData.reduce((sum, item) => sum + item.tam, 0)
  const totalSpend = Math.round(533325 * selectedRange.multiplier)

  return (
    <div className="app-shell">
      <main id="channels">
        <div className="content">
          <section className="metrics" aria-label="Channel summary">
            <Metric label="Total Visits" value={compactNumber(totalVisits)} /><Metric label="Total Spend" value={`$${compactNumber(totalSpend)}`} /><Metric label="$ per Business Visit" value={`$${(2.15 * selectedRange.costMultiplier).toFixed(2)}`} /><Metric label="TAM Visits" value={compactNumber(tamVisits)} /><Metric label="$ per TAM Visit" value={`$${(18.29 * selectedRange.costMultiplier).toFixed(2)}`} />
          </section>
          <section className="global-filter" aria-label="Global date filter">
            <label className="range-select">
              <span className="visually-hidden">Select report period</span>
              <select value={days} onChange={(event) => setDays(Number(event.target.value) as keyof typeof dateRanges)}>
                {Object.entries(dateRanges).map(([value, option]) => <option key={value} value={value}>{option.label}</option>)}
              </select>
            </label>
            <strong>{selectedRange.range}</strong>
            <div className="view-mode-toggle" role="group" aria-label="Dashboard view">
              <button className={viewMode === 'chart' ? 'selected-view' : ''} type="button" aria-label="Chart view" aria-pressed={viewMode === 'chart'} onClick={() => setViewMode('chart')}><span className="bar-view-icon">▥</span></button>
              <button className={viewMode === 'table' ? 'selected-view' : ''} type="button" aria-label="Table view" aria-pressed={viewMode === 'table'} onClick={() => setViewMode('table')}><span className="table-view-icon">☰</span></button>
            </div>
          </section>
          {viewMode === 'chart' ? <>
          <div className="charts-grid">
          <ChartCard title="Visits By Channel">
            <div className="legend"><Legend color={lime} label="TAM Visits" /><Legend color={teal} label="Business Visits" /></div>
            <div className="visits-chart"><ResponsiveContainer width="100%" height="100%"><BarChart accessibilityLayer={false} data={visibleChannelData} margin={{ top: 18, right: 26, bottom: 0, left: 22 }} barCategoryGap="27%">
              <CartesianGrid vertical={false} stroke="#dce1e4" /><XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} tick={{ fill: '#202226', fontSize: 9 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#202226', fontSize: 11 }} tickFormatter={(value) => `${value / 1000}k`} domain={[0, 50000]} ticks={[0, 10000, 20000, 30000, 40000, 50000]} label={{ value: 'Visits', angle: -90, position: 'insideLeft', fill: '#202226', fontSize: 11 }} /><Tooltip content={DashboardTooltip} trigger="hover" shared={false} cursor={false} /><Bar dataKey="tam" name="TAM Visits" stackId="visits" fill={lime} activeBar={{ fill: lime, stroke: 'none', strokeWidth: 0 }} /><Bar dataKey="business" name="Business Visits" stackId="visits" fill={teal} fillOpacity={0.22} activeBar={{ fill: teal, fillOpacity: 0.95, stroke: 'none', strokeWidth: 0 }} />
            </BarChart></ResponsiveContainer></div>
          </ChartCard>
          <ChartCard title="$ per Visit">
            <div className="legend"><Legend color={lime} label="$ Per TAM Visit" /><Legend color={teal} label="$ Per Business Visit" /></div>
            <div className="cost-chart"><ResponsiveContainer width="100%" height="100%"><BarChart accessibilityLayer={false} data={visibleCostData} layout="vertical" margin={{ top: 12, right: 22, bottom: 18, left: 28 }} barSize={17} barGap={3}>
              <CartesianGrid horizontal={false} stroke="#e3e6e9" /><XAxis type="number" axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(value) => `$${value}`} tick={{ fill: '#202226', fontSize: 10 }} orientation="top" /><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={126} tick={<CategoryTick />} /><Tooltip content={DashboardTooltip} trigger="hover" shared={false} cursor={false} /><Bar dataKey="tam" name="$ Per TAM Visit" fill={lime} activeBar={{ fill: lime, stroke: 'none', strokeWidth: 0 }}>{visibleCostData.map((entry) => <Cell key={`tam-${entry.name}`} fillOpacity={entry.name === 'Display' ? 1 : 0.22} />)}</Bar><Bar dataKey="business" name="$ Per Business Visit" fill={teal} activeBar={{ fill: teal, stroke: 'none', strokeWidth: 0 }}>{visibleCostData.map((entry) => <Cell key={`business-${entry.name}`} fillOpacity={entry.name === 'Display' ? 1 : 0.22} />)}</Bar>
            </BarChart></ResponsiveContainer></div>
          </ChartCard>
          </div>
          <div className="bottom-charts-grid">
          <ChartCard title="Total Visits">
            <div className="legend"><Legend color={lime} label="TAM Visits" /><Legend color={teal} label="Business Visits" /></div>
            <div className="total-visits-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart accessibilityLayer={false} data={visibleTotalVisitsData} margin={{ top: 28, right: 40, bottom: 12, left: 28 }}>
              <defs>
                <linearGradient id="businessVisits" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={teal} stopOpacity={0.14} /><stop offset="100%" stopColor={teal} stopOpacity={0.05} /></linearGradient>
                <linearGradient id="tamVisits" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={lime} stopOpacity={0.25} /><stop offset="100%" stopColor={lime} stopOpacity={0.1} /></linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#d9dddd" /><XAxis dataKey="date" interval={2} axisLine={false} tickLine={false} tick={{ fill: '#3a3a3a', fontSize: 11 }} /><YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} axisLine={false} tickLine={false} tick={{ fill: '#3a3a3a', fontSize: 11 }} tickFormatter={(value) => value === 0 ? '0k' : value} /><Tooltip content={DashboardTooltip} trigger="hover" cursor={{ stroke: '#777', strokeWidth: 2, strokeDasharray: '6 6' }} /><Area type="monotone" dataKey="business" name="Business Visits" stroke={teal} strokeWidth={2} fill="url(#businessVisits)" activeDot={{ r: 6, fill: teal, stroke: '#d5f2f5', strokeWidth: 8 }} /><Area type="monotone" dataKey="tam" name="TAM Visits" stroke={lime} strokeWidth={1.5} fill="url(#tamVisits)" activeDot={{ r: 6, fill: lime, stroke: '#effbd4', strokeWidth: 8 }} />
            </AreaChart></ResponsiveContainer></div>
          </ChartCard>
          <ChartCard title="Visits By Channel">
            <div className="legend"><Legend color={lime} label="TAM Visits" /><Legend color={teal} label="Business Visits" /></div>
            <div className="vendor-chart">
              <div className="vendor-list" aria-label="Channel vendors">
                <div className="vendor-head">Channel</div><div className="vendor-head">Vendor</div><div className="vendor-head">$/TAM</div>
                {visibleVendorData.map((item) => <div className="vendor-row" key={item.vendor}><span>{item.channel}</span><a href={`#${item.vendor.toLowerCase()}`}>{item.vendor}</a><span>${item.cost.toFixed(2)}</span></div>)}
              </div>
              <div className="vendor-bars"><ResponsiveContainer width="100%" height="100%"><BarChart accessibilityLayer={false} data={visibleVendorData} layout="vertical" margin={{ top: 27, right: 60, bottom: 0, left: 0 }} barSize={18} barCategoryGap="22%">
                <XAxis type="number" hide /><YAxis type="category" dataKey="vendor" hide /><Tooltip content={DashboardTooltip} trigger="hover" shared={false} cursor={false} /><Bar dataKey="tam" name="TAM Visits" stackId="visits" fill={lime} activeBar={{ fill: lime, stroke: 'none', strokeWidth: 0 }} /><Bar dataKey="business" name="Business Visits" stackId="visits" fill={teal} activeBar={{ fill: teal, stroke: 'none', strokeWidth: 0 }}><LabelList dataKey={(item) => item.tam + item.business} position="right" formatter={(value) => `${Number(value).toLocaleString()} Visits`} fill="#202124" fontSize={11} /></Bar>
              </BarChart></ResponsiveContainer></div>
            </div>
          </ChartCard>
          </div>
          <ChartCard title="Trends">
            <div className="legend"><Legend color={lime} label="Return on Spend" /><Legend color={teal} label="Cost per Opportunity" /></div>
            <div className="trends-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart accessibilityLayer={false} data={visibleTrendsData} margin={{ top: 20, right: 36, bottom: 8, left: 12 }}>
              <defs><linearGradient id="trendReturn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={lime} stopOpacity={0.2} /><stop offset="100%" stopColor={lime} stopOpacity={0.04} /></linearGradient><linearGradient id="trendCost" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={lime} stopOpacity={0.55} /><stop offset="100%" stopColor={lime} stopOpacity={0.12} /></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="#dfe3e3" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} /><YAxis yAxisId="return" domain={[0, 5]} tickFormatter={(value) => `${value}x`} axisLine={false} tickLine={false} tick={{ fill: '#8baa45', fontSize: 10 }} /><YAxis yAxisId="cost" orientation="right" domain={[3000, 5500]} tickFormatter={(value) => `$${value / 1000}k`} axisLine={false} tickLine={false} tick={{ fill: '#8baa45', fontSize: 10 }} /><Tooltip content={DashboardTooltip} trigger="hover" /><Area yAxisId="cost" type="monotone" dataKey="cost" name="Cost per Opportunity" stroke="#8eb044" strokeWidth={2} fill="url(#trendCost)" /><Area yAxisId="return" type="monotone" dataKey="returnSpend" name="Return on Spend" stroke="#9ab954" strokeWidth={1.5} fill="url(#trendReturn)" />
            </AreaChart></ResponsiveContainer></div>
          </ChartCard>
          <div className="additional-charts-grid">
            <ChartCard title="Vendor Return on Spend">
              <div className="return-chart"><ResponsiveContainer width="100%" height="100%"><BarChart accessibilityLayer={false} data={visibleReturnSpendData} margin={{ top: 24, right: 16, bottom: 26, left: 0 }}>
                <CartesianGrid vertical={false} stroke="#e2e5e4" /><XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} interval={0} /><YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 10 }} /><Tooltip content={DashboardTooltip} trigger="hover" shared={false} cursor={false} /><Bar dataKey="ros" name="Return on Spend" fill={lime} activeBar={{ fill: lime, stroke: 'none', strokeWidth: 0 }}>{visibleReturnSpendData.map((item, index) => <Cell key={item.channel} fillOpacity={index === 1 ? 1 : 0.25} />)}<LabelList dataKey="ros" position="top" formatter={(value) => `${value}x`} fill="#85925d" fontSize={10} /></Bar>
              </BarChart></ResponsiveContainer></div>
            </ChartCard>
            <DataTableCard title="Pipeline Influenced and Spend" columns={['Channel', 'Pipeline Influenced', 'Spend']} rows={visiblePipelineData.map((item) => [item.channel, `$${item.influenced.toLocaleString()}`, `$${item.spend.toLocaleString()}`])} />
          </div>
          <ChartCard title="Vendor Influence">
            <div className="legend"><Legend color={lime} label="Opportunity Influence" /><Legend color={teal} label="Pipeline $ Influence" /></div>
            <div className="influence-chart"><ResponsiveContainer width="100%" height="100%"><BarChart accessibilityLayer={false} data={influenceData} layout="vertical" margin={{ top: 14, right: 48, bottom: 8, left: 8 }} barSize={9} barGap={4}>
              <CartesianGrid horizontal={false} stroke="#eef0ef" /><XAxis type="number" domain={[0, 100]} hide /><YAxis type="category" dataKey="vendor" width={105} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#202124' }} /><Tooltip content={DashboardTooltip} trigger="hover" shared={false} cursor={false} /><Bar dataKey="opportunity" name="Opportunity Influence" fill={lime} fillOpacity={0.95} activeBar={{ fill: lime, stroke: 'none', strokeWidth: 0 }}><LabelList dataKey="opportunity" position="right" formatter={(value) => `${value}%`} fill="#83935a" fontSize={9} /></Bar><Bar dataKey="pipeline" name="Pipeline Influence" fill={lime} fillOpacity={0.28} activeBar={{ fill: lime, fillOpacity: 0.62, stroke: 'none', strokeWidth: 0 }}><LabelList dataKey="pipeline" position="right" formatter={(value) => `${value}%`} fill="#9baa7a" fontSize={9} /></Bar>
            </BarChart></ResponsiveContainer></div>
          </ChartCard>
          </> : <div className="table-grid">
            <DataTableCard title="Visits By Channel" columns={['Channel', 'TAM Visits', 'Business Visits', 'All Visits']} rows={visibleChannelData.map((item) => [item.name, item.tam.toLocaleString(), item.business.toLocaleString(), (item.tam + item.business).toLocaleString()])} />
            <DataTableCard title="$ per Visit" columns={['Channel', '$ per TAM Visit', '$ per Business Visit']} rows={visibleCostData.map((item) => [item.name, `$${item.tam.toFixed(2)}`, `$${item.business.toFixed(2)}`])} />
            <DataTableCard title="Total Visits" columns={['Date', 'TAM Visits', 'Business Visits', 'All Visits']} rows={visibleTotalVisitsData.map((item) => [item.date, item.tam, item.business, item.tam + item.business])} />
            <VendorTable data={visibleVendorData} />
            <DataTableCard title="Trends" columns={['Month', 'Return on Spend', 'Cost per Opportunity']} rows={visibleTrendsData.map((item) => [item.month, `${item.returnSpend}x`, `$${item.cost.toLocaleString()}`])} />
            <DataTableCard title="Vendor Return on Spend" columns={['Channel', 'Return on Spend']} rows={visibleReturnSpendData.map((item) => [item.channel, `${item.ros}x`])} />
            <DataTableCard title="Pipeline Influenced and Spend" columns={['Channel', 'Pipeline Influenced', 'Spend']} rows={visiblePipelineData.map((item) => [item.channel, `$${item.influenced.toLocaleString()}`, `$${item.spend.toLocaleString()}`])} />
            <DataTableCard title="Vendor Influence" columns={['Vendor', 'Channel', 'Opportunity Influence', 'Pipeline Influence']} rows={influenceData.map((item) => [item.vendor, item.channel, `${item.opportunity}%`, `${item.pipeline}%`])} />
          </div>}
        </div>
      </main>
    </div>
  )
}
