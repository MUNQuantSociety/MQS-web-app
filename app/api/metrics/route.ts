// app/api/metrics/route.ts

import { NextResponse } from 'next/server'
import { Pool } from 'pg'

// Reuse a pooled client across invocations
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

export async function GET() {
  try {
    const client = await pool.connect()

    const { rows } = await client.query<{
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

    client.release()

    // Reverse to chronological order and shape for the Dashboard
    const data = rows
      .reverse()
      .map((r) => ({
        timestamp: r.timestamp.toISOString(),
        notional:   Number(r.notional),
        nav:        Number(r.realized_pnl) + Number(r.unrealized_pnl),
        open:       Number(r.notional),
        high:       Number(r.notional),
        low:        Number(r.notional),
        close:      Number(r.notional),
      }))

    return NextResponse.json(data)
  } catch (err) {
    console.error('Error in /api/metrics:', err)
    return NextResponse.json({ error: 'Unable to fetch metrics' }, { status: 500 })
  }
}
