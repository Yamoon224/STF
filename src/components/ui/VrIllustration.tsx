export function VrIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration abstraite d'un casque de réalité virtuelle entouré d'icônes de modules d'apprentissage"
    >
      <circle cx="240" cy="160" r="150" className="fill-stf-green/5 dark:fill-white/5" />

      {/* headset strap */}
      <path
        d="M110 150 C 110 90, 170 55, 240 55 C 310 55, 370 90, 370 150"
        stroke="currentColor"
        className="text-stf-navy/70 dark:text-white/40"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* headset body */}
      <rect x="95" y="140" width="290" height="95" rx="34" className="fill-stf-navy dark:fill-white/90" />
      <circle cx="175" cy="187" r="34" className="fill-stf-blue dark:fill-stf-navy" />
      <circle cx="305" cy="187" r="34" className="fill-stf-blue dark:fill-stf-navy" />
      <circle cx="175" cy="187" r="16" className="fill-white/80 dark:fill-white/60" />
      <circle cx="305" cy="187" r="16" className="fill-white/80 dark:fill-white/60" />
      <rect x="220" y="205" width="40" height="10" rx="5" className="fill-stf-orange" />

      {/* floating module icons */}
      <g>
        <circle cx="80" cy="80" r="22" className="fill-stf-orange" />
        <text x="80" y="88" textAnchor="middle" fontSize="18" className="fill-white">🧪</text>
      </g>
      <g>
        <circle cx="400" cy="90" r="24" className="fill-stf-green" />
        <text x="400" y="98" textAnchor="middle" fontSize="19" className="fill-white">🧩</text>
      </g>
      <g>
        <circle cx="60" cy="230" r="18" className="fill-stf-blue" />
        <text x="60" y="236" textAnchor="middle" fontSize="15" className="fill-white">🏅</text>
      </g>
      <g>
        <circle cx="420" cy="220" r="20" className="fill-stf-orange" />
        <text x="420" y="227" textAnchor="middle" fontSize="16" className="fill-white">📊</text>
      </g>

      {/* dashed orbit connecting the modules to the headset */}
      <path
        d="M100 100 Q 150 130 150 150"
        stroke="currentColor"
        className="text-stf-orange/40 dark:text-orange-300/30"
        strokeWidth="2"
        strokeDasharray="4 6"
        fill="none"
      />
      <path
        d="M380 110 Q 340 135 335 150"
        stroke="currentColor"
        className="text-stf-green/40 dark:text-green-300/30"
        strokeWidth="2"
        strokeDasharray="4 6"
        fill="none"
      />
    </svg>
  );
}
