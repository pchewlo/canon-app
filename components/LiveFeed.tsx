'use client'

import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { QuestBadge } from "@/components/QuestBadge"
import type { Decision } from "@/lib/types"

type LiveFeedProps = {
  decisions: Decision[]
  maxItems?: number
  onItemClick?: (decision: Decision) => void
}

const typeDisplay: Record<Decision['type'], { label: string; variant: 'rg_hold' | 'rg_caution' | 'success' | 'warning' | 'info' | 'neutral' | 'accent'; muted?: boolean }> = {
  mission: { label: "Mission", variant: "accent" },
  bonus: { label: "Bonus", variant: "success" },
  cooldown: { label: "Cooldown", variant: "neutral", muted: true },
  cashback_deferred: { label: "Cashback", variant: "warning" },
  f2p: { label: "F2P", variant: "neutral" },
  no_action: { label: "No action", variant: "neutral", muted: true },
  held_rg: { label: "RG Hold", variant: "rg_hold" },
  blocked_rg: { label: "RG Block", variant: "rg_hold" },
}

function formatTime(timestamp: string): string {
  const d = new Date(timestamp)
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

function formatCost(cost: number): string {
  if (cost === 0) return "\u2014"
  return `\u00A3${cost.toFixed(2)}`
}

export function LiveFeed({ decisions, maxItems = 50, onItemClick }: LiveFeedProps) {
  const visible = decisions.slice(0, maxItems)
  const isRgRow = (type: Decision['type']) => type === 'held_rg' || type === 'blocked_rg'
  const isMutedRow = (type: Decision['type']) => type === 'cooldown' || type === 'no_action'

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-[12px] font-medium uppercase tracking-wide text-quest-ink-faint">
          Decision feed
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-quest-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-success" />
          </span>
          LIVE
        </span>
      </div>

      {/* Feed */}
      <div className="max-h-[400px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {visible.map((decision) => {
            const display = typeDisplay[decision.type]
            return (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "flex flex-col gap-1.5 border-b border-border px-4 py-2 text-[13px] cursor-default",
                  isRgRow(decision.type)
                    ? "bg-quest-danger-soft/50"
                    : isMutedRow(decision.type)
                    ? "opacity-60 hover:opacity-80 hover:bg-quest-surface-muted"
                    : "hover:bg-quest-surface-muted",
                  onItemClick && "cursor-pointer",
                )}
                onClick={() => onItemClick?.(decision)}
              >
                {/* Top row: meta */}
                <div className="flex items-center gap-3">
                  <span className="w-[64px] shrink-0 tabular-nums text-quest-ink-faint text-[12px]">
                    {formatTime(decision.timestamp)}
                  </span>

                  <span className="w-[72px] shrink-0 truncate tabular-nums text-quest-ink-muted">
                    {decision.playerId.slice(0, 8)}
                  </span>

                  <span className="shrink-0">
                    <QuestBadge variant={display.variant} muted={display.muted}>
                      {display.label}
                    </QuestBadge>
                  </span>

                  <span className="ml-auto shrink-0 text-right tabular-nums text-quest-ink-muted">
                    {formatCost(decision.cost)}
                  </span>
                </div>

                {/* Bottom row: full-width signals */}
                {decision.signals.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 pl-[64px]">
                    {decision.signals.map((signal) => (
                      <span
                        key={signal}
                        className="inline-flex items-center rounded bg-quest-surface-muted px-1.5 py-0.5 text-[11px] text-quest-ink-faint"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="flex items-center justify-center py-8 text-[13px] text-quest-ink-faint">
            No decisions yet
          </div>
        )}
      </div>
    </div>
  )
}
