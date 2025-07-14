// app/about/page.tsx

import AboutPageClient from '@/components/ui/about/AboutPageClient'
import type { Metric } from '@/components/ui/dashboard/Dashboard'
import { Pool } from 'pg'

export const revalidate = 0

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

export default async function AboutPage() {
  const { rows } = await pool.query<{
    timestamp: Date
    notional: number
    realized_pnl: number
    unrealized_pnl: number
  }>(`
    SELECT
        timestamp,
        notional,
        realized_pnl,
        unrealized_pnl
      FROM pnl_book
      WHERE notional <> 0
     ORDER BY timestamp ASC
  `)

  const initialData: Metric[] = rows
    .reverse()
    .map((r) => ({
      timestamp: r.timestamp.toISOString(),
      notional:  Number(r.notional),
      nav:       Number(r.realized_pnl) + Number(r.unrealized_pnl),
      open:      Number(r.notional),
      high:      Number(r.notional),
      low:       Number(r.notional),
      close:     Number(r.notional),
    }))

  return <AboutPageClient initialData={initialData} />
}
