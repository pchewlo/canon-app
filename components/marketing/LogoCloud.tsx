type Logo = { label: string }

export function LogoCloud({
  logos,
  caption,
}: {
  logos: Logo[]
  caption?: string
}) {
  // Until we have real partner logos to publish, render
  // type-set wordmarks. Replace with <img> when assets land.
  return (
    <div>
      {caption && (
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint text-center mb-6">
          {caption}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-6 items-center">
        {logos.map((logo) => (
          <div
            key={logo.label}
            className="text-center text-quest-ink-faint text-[14px] font-semibold tracking-wide opacity-70 hover:opacity-100 transition-opacity"
          >
            {logo.label}
          </div>
        ))}
      </div>
    </div>
  )
}
