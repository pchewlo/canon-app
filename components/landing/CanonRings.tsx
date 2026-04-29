export function CanonRings({
  size = 200,
  color = "currentColor",
}: {
  size?: number
  color?: string
}) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden>
      <g transform="translate(100, 100)">
        <path
          d="M -48,2 a 44,44 0 1,0 88,0 a 44,44 0 1,0 -88,0 z M -44.8,3 a 42,42 0 1,0 84,0 a 42,42 0 1,0 -84,0 z"
          fill={color}
          fillRule="evenodd"
        />
        <path
          d="M -19,-2 a 22,22 0 1,0 44,0 a 22,22 0 1,0 -44,0 z M -16.8,-2.5 a 20.5,20.5 0 1,0 41,0 a 20.5,20.5 0 1,0 -41,0 z"
          fill={color}
          fillRule="evenodd"
        />
        <circle cx="0" cy="0" r="5" fill={color} />
      </g>
    </svg>
  )
}
