export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration abstraite représentant un réseau de mentorat en sciences et technologies"
    >
      <circle cx="240" cy="240" r="200" className="fill-stf-blue/5 dark:fill-white/5" />
      <circle cx="240" cy="240" r="150" stroke="currentColor" className="text-stf-blue/20 dark:text-white/10" strokeWidth="1.5" strokeDasharray="4 6" />
      <circle cx="240" cy="240" r="105" stroke="currentColor" className="text-stf-orange/25 dark:text-white/10" strokeWidth="1.5" />

      {/* connecting lines (mentorship network) */}
      <path d="M240 240 L150 140" stroke="currentColor" className="text-stf-blue/40 dark:text-blue-300/30" strokeWidth="2" />
      <path d="M240 240 L360 150" stroke="currentColor" className="text-stf-blue/40 dark:text-blue-300/30" strokeWidth="2" />
      <path d="M240 240 L110 300" stroke="currentColor" className="text-stf-orange/40 dark:text-orange-300/30" strokeWidth="2" />
      <path d="M240 240 L340 340" stroke="currentColor" className="text-stf-orange/40 dark:text-orange-300/30" strokeWidth="2" />
      <path d="M240 240 L260 90" stroke="currentColor" className="text-stf-green/40 dark:text-green-300/30" strokeWidth="2" />

      {/* central node: the mentee/mentor pairing */}
      <circle cx="240" cy="240" r="34" className="fill-stf-navy dark:fill-white/90" />
      <circle cx="240" cy="240" r="34" stroke="white" strokeWidth="3" className="dark:stroke-surface" />
      <text x="240" y="248" textAnchor="middle" fontSize="28" className="fill-white dark:fill-stf-navy">
        🤝
      </text>

      {/* satellite nodes */}
      <g>
        <circle cx="150" cy="140" r="22" className="fill-stf-blue" />
        <text x="150" y="148" textAnchor="middle" fontSize="18" className="fill-white">🔬</text>
      </g>
      <g>
        <circle cx="360" cy="150" r="20" className="fill-stf-blue" />
        <text x="360" y="157" textAnchor="middle" fontSize="16" className="fill-white">💻</text>
      </g>
      <g>
        <circle cx="110" cy="300" r="18" className="fill-stf-orange" />
        <text x="110" y="306" textAnchor="middle" fontSize="15" className="fill-white">📐</text>
      </g>
      <g>
        <circle cx="340" cy="340" r="24" className="fill-stf-orange" />
        <text x="340" y="348" textAnchor="middle" fontSize="19" className="fill-white">🚀</text>
      </g>
      <g>
        <circle cx="260" cy="90" r="16" className="fill-stf-green" />
        <text x="260" y="96" textAnchor="middle" fontSize="13" className="fill-white">⚙️</text>
      </g>

      {/* small decorative dots */}
      <circle cx="70" cy="200" r="4" className="fill-stf-blue/40 dark:fill-blue-300/40" />
      <circle cx="410" cy="240" r="5" className="fill-stf-orange/40 dark:fill-orange-300/40" />
      <circle cx="200" cy="420" r="4" className="fill-stf-green/40 dark:fill-green-300/40" />
      <circle cx="390" cy="380" r="3" className="fill-stf-blue/40 dark:fill-blue-300/40" />
    </svg>
  );
}
