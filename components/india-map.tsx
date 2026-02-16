"use client";

interface IndiaMapProps {
  className?: string;
  highlightState?: string;
  showDots?: boolean;
}

const statePositions: Record<string, { x: number; y: number; delay: number }> = {
  "All India": { x: 50, y: 58, delay: 0 },
  "Delhi": { x: 44, y: 35, delay: 0.3 },
  "Uttar Pradesh": { x: 52, y: 40, delay: 0.6 },
};

export function IndiaMap({ className = "", highlightState, showDots = true }: IndiaMapProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="indiaMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 153, 51, 0.15)" />
            <stop offset="50%" stopColor="rgba(0, 0, 128, 0.1)" />
            <stop offset="100%" stopColor="rgba(19, 136, 8, 0.15)" />
          </linearGradient>
        </defs>

        {/* India outline - main shape */}
        <path
          d="M85 8 L95 5 L105 8 L112 12 L118 8 L125 15 L130 12 L138 18 L142 25 L148 22 L152 30 L150 38 L155 42 L152 50 L158 55 L155 62 L160 68 L158 75 L165 80 L162 88 L168 95 L165 102 L170 108 L168 115 L175 120 L172 128 L178 135 L175 142 L180 148 L178 155 L175 162 L180 168 L175 175 L170 180 L165 178 L160 185 L155 182 L148 188 L142 185 L138 192 L130 188 L125 195 L118 190 L112 198 L105 192 L100 200 L92 195 L85 202 L78 195 L72 200 L68 192 L62 198 L58 190 L52 195 L48 188 L42 192 L40 185 L35 188 L32 180 L28 185 L25 178 L20 180 L18 172 L22 168 L18 162 L25 158 L20 152 L28 148 L22 142 L30 138 L25 132 L32 128 L28 120 L35 118 L32 110 L40 108 L38 100 L45 98 L42 90 L50 88 L48 80 L55 78 L52 70 L60 68 L58 60 L65 58 L62 50 L70 48 L68 40 L75 38 L72 30 L80 28 L78 20 L85 15 Z"
          fill="url(#indiaMapGradient)"
          stroke="#000080"
          strokeWidth="1.5"
          className="transition-all duration-500"
        />

        {/* Kashmir region */}
        <path
          d="M75 8 L85 5 L95 8 L90 15 L82 18 L75 15 L72 10 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />

        {/* Gujarat */}
        <path
          d="M28 120 L35 118 L40 125 L38 135 L30 138 L22 132 L25 125 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />

        {/* Rajasthan */}
        <path
          d="M35 80 L50 78 L55 85 L52 100 L45 105 L38 100 L35 90 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />

        {/* Uttar Pradesh */}
        <path
          d="M55 70 L75 68 L85 75 L82 88 L72 95 L58 92 L52 82 Z"
          fill={highlightState === "Uttar Pradesh" ? "rgba(255, 153, 51, 0.3)" : "rgba(0, 0, 128, 0.08)"}
          stroke={highlightState === "Uttar Pradesh" ? "#FF9933" : "#000080"}
          strokeWidth="0.8"
          className={highlightState === "Uttar Pradesh" ? "animate-pulse" : ""}
        />

        {/* Delhi */}
        <circle
          cx="72"
          cy="78"
          r="4"
          fill={highlightState === "Delhi" ? "rgba(255, 153, 51, 0.4)" : "rgba(0, 0, 128, 0.15)"}
          stroke={highlightState === "Delhi" ? "#FF9933" : "#000080"}
          strokeWidth="0.8"
          className={highlightState === "Delhi" ? "animate-pulse" : ""}
        />

        {/* Maharashtra */}
        <path
          d="M50 110 L70 108 L75 120 L72 135 L58 138 L48 130 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />

        {/* Karnataka */}
        <path
          d="M58 138 L72 135 L78 148 L75 162 L62 168 L55 158 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />

        {/* Tamil Nadu */}
        <path
          d="M75 162 L88 160 L92 175 L82 185 L72 178 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />

        {/* West Bengal */}
        <path
          d="M105 95 L115 92 L118 108 L112 120 L102 115 Z"
          fill="rgba(0, 0, 128, 0.08)"
          stroke="#000080"
          strokeWidth="0.8"
        />
      </svg>

      {/* Animated pulsing dots */}
      {showDots && (
        <div className="absolute inset-0 overflow-hidden">
          {Object.entries(statePositions).map(([state, pos]) => (
            <span
              key={state}
              className={`map-dot ${state === "All India" ? "map-dot-saffron" : "map-dot-green"} ${
                highlightState && highlightState !== state && state !== "All India"
                  ? "opacity-20"
                  : ""
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animationDelay: `${pos.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
