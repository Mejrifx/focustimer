import { motion } from 'framer-motion';

interface BatteryChargeProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function BatteryCharge({ fillLevel, isBreak }: BatteryChargeProps) {
  const fillHeight = fillLevel * 100;
  const glowIntensity = isBreak ? fillLevel : 1 - fillLevel;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fillLevel > 0.5 ? '#10b981' : fillLevel > 0.2 ? '#f59e0b' : '#ef4444'} />
            <stop offset="100%" stopColor={fillLevel > 0.5 ? '#059669' : fillLevel > 0.2 ? '#d97706' : '#dc2626'} />
          </linearGradient>

          <filter id="batteryGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect
          x="50"
          y="60"
          width="100"
          height="120"
          rx="8"
          fill="none"
          stroke="#374151"
          strokeWidth="4"
        />

        <rect
          x="80"
          y="45"
          width="40"
          height="15"
          rx="4"
          fill="#374151"
        />

        <rect
          x="55"
          y={175 - fillHeight * 1.1}
          width="90"
          height={fillHeight * 1.1}
          rx="4"
          fill="url(#batteryGradient)"
          className="transition-all duration-1000 ease-linear"
          style={{
            filter: glowIntensity > 0.7 ? 'url(#batteryGlow)' : 'none'
          }}
        />

        {isBreak && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              d="M 100 35 L 95 45 L 102 45 L 98 55 L 105 40 L 98 40 L 100 35"
              fill="#fbbf24"
              filter="url(#batteryGlow)"
            />
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Recharging...' : 'Power Draining'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {Math.round(fillLevel * 100)}%
        </p>
      </div>
    </div>
  );
}
