"use client"

// Product-shot for /product/insights (paired opposite the lift bars).
// Shows the warehouse-export panel: which dataset, which destination,
// last sync timestamp, row counts. Conveys "lift attribution → your
// own BI stack."

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const DATASETS = [
  { name: "decisions", rows: 4_217_338, dest: "BigQuery" },
  { name: "signals", rows: 11_840_512, dest: "BigQuery" },
  { name: "lift_attribution_daily", rows: 91_245, dest: "Snowflake" },
  { name: "rg_check_log", rows: 218_603, dest: "Snowflake" },
  { name: "audit_decisions_30d", rows: 4_217_338, dest: "S3" },
]

export function InsightsWarehouseShot() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-quest-surface-muted/30 px-5 py-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Warehouse exports
          </div>
          <div className="text-[14px] font-semibold text-quest-ink">
            Daily syncs · 5 datasets
          </div>
        </div>
        <span className="rounded-full bg-quest-success-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-quest-success">
          all healthy
        </span>
      </div>

      <ul>
        {DATASETS.map((d, i) => {
          const justSynced = tick % DATASETS.length === i
          return (
            <li
              key={d.name}
              className="grid grid-cols-[1.6fr_0.8fr_0.8fr_auto] items-center gap-3 border-b border-border px-5 py-3 text-[12px] last:border-b-0"
            >
              <span className="font-mono text-quest-ink">{d.name}</span>
              <span className="text-quest-ink-muted">{d.dest}</span>
              <span className="text-right tabular-nums text-quest-ink">
                {d.rows.toLocaleString("en-GB")}
              </span>
              <motion.span
                animate={{
                  backgroundColor: justSynced ? "#DBEDDB" : "rgba(247,247,245,1)",
                  color: justSynced ? "#448361" : "#5F5E5B",
                }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              >
                {justSynced && (
                  <span className="h-1.5 w-1.5 rounded-full bg-quest-success" />
                )}
                {justSynced ? "syncing" : "synced"}
              </motion.span>
            </li>
          )
        })}
      </ul>

      <div className="bg-quest-surface-muted/30 px-5 py-2.5 text-[11px] text-quest-ink-faint border-t border-border flex items-center justify-between">
        <span>Next sync · in 47 min</span>
        <span className="tabular-nums">Bytes today: 2.41 GB</span>
      </div>
    </div>
  )
}
