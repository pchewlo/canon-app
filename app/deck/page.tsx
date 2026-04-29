"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const SLIDES = [
  "/deck/1.svg",
  "/deck/2.svg",
  "/deck/3.svg",
  "/deck/4.svg",
  "/deck/5.svg",
  "/deck/6.svg",
  "/deck/7.svg",
  "/deck/8.svg",
  "/deck/9.svg",
  "/deck/10.svg",
  "/deck/11.svg",
]

export default function DeckPage() {
  const [index, setIndex] = useState(0)
  const total = SLIDES.length

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => Math.min(total - 1, Math.max(0, i + delta))),
    [total],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault()
        go(1)
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        go(-1)
      } else if (e.key === "Home") {
        setIndex(0)
      } else if (e.key === "End") {
        setIndex(total - 1)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [go, total])

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      <header className="grid grid-cols-3 items-center px-5 py-3 text-white/70 text-[12px]">
        <div
          className="justify-self-start"
          style={{
            fontFamily:
              '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
            letterSpacing: "0.32em",
            fontSize: 13,
            color: "#F2EBD3",
          }}
        >
          CANON
        </div>

        <div className="justify-self-center tabular-nums text-white/55">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        <nav className="justify-self-end flex items-center gap-5">
          <Link href="/" className="hover:text-white transition-colors">
            Site
          </Link>
          <Link href="/app" className="hover:text-white transition-colors">
            Product demo
          </Link>
        </nav>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-4 pb-4">
        <div
          className="relative w-full max-w-[1400px]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_20px_80px_-10px_rgba(0,0,0,0.6)] bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={SLIDES[index]}
              src={SLIDES[index]}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
            {SLIDES.slice(index + 1, index + 3).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="hidden" aria-hidden />
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize focus:outline-none"
          />
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 w-3/4 cursor-e-resize focus:outline-none"
          />

          <NavArrow side="left" disabled={index === 0} onClick={() => go(-1)} />
          <NavArrow
            side="right"
            disabled={index === total - 1}
            onClick={() => go(1)}
          />
        </div>
      </main>

      <footer className="flex items-center justify-center gap-4 px-5 py-3 text-white/40 text-[11px]">
        <span>← →</span>
        <span>or click the slide to advance</span>
      </footer>
    </div>
  )
}

function NavArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right"
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 ${
        side === "left" ? "left-3" : "right-3"
      } -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/40 text-white/85 backdrop-blur flex items-center justify-center text-lg transition hover:bg-black/65 disabled:opacity-0`}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  )
}
