import { motion } from 'framer-motion';

interface BatteryChargeProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function BatteryCharge({ fillLevel, isBreak }: BatteryChargeProps) {
  const fillHeight = fillLevel * 115;
  const batteryLevel = 175 - fillHeight;
  const glowIntensity = isBreak ? fillLevel : 1 - fillLevel;
  const chargeColor = fillLevel > 0.5 ? '#10b981' : fillLevel > 0.2 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chargeColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={chargeColor} stopOpacity="1" />
            <stop offset="100%" stopColor={fillLevel > 0.5 ? '#059669' : fillLevel > 0.2 ? '#d97706' : '#dc2626'} />
          </linearGradient>

          <linearGradient id="batteryCaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="50%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>

          <radialGradient id="chargeGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor={chargeColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={chargeColor} stopOpacity="0" />
          </radialGradient>

          <filter id="batteryGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="chargePulse">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Battery Shadow */}
        <ellipse
          cx="100"
          cy="185"
          rx="55"
          ry="6"
          fill="#000000"
          opacity="0.2"
        />

        {/* Battery Case */}
        <rect
          x="50"
          y="60"
          width="100"
          height="120"
          rx="8"
          ry="8"
          fill="url(#batteryCaseGradient)"
          stroke="#1f2937"
          strokeWidth="3"
        />

        {/* Battery Terminal */}
        <rect
          x="80"
          y="45"
          width="40"
          height="18"
          rx="4"
          ry="4"
          fill="url(#batteryCaseGradient)"
          stroke="#1f2937"
          strokeWidth="2"
        />
        <rect
          x="85"
          y="48"
          width="30"
          height="12"
          rx="2"
          fill="#1f2937"
        />

        {/* Charge Fill */}
        <motion.rect
          x="55"
          y={batteryLevel}
          width="90"
          height={fillHeight}
          rx="4"
          fill="url(#batteryGradient)"
          filter={glowIntensity > 0.7 ? "url(#batteryGlow)" : "none"}
          className="transition-all duration-1000 ease-linear"
        />

        {/* Charge Level Indicator Lines */}
        <g opacity="0.3">
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="52"
              y1={60 + (i + 1) * 24}
              x2="148"
              y2={60 + (i + 1) * 24}
              stroke="#1f2937"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}
        </g>

        {/* Charge Glow Effect */}
        {fillLevel > 0.1 && (
          <motion.ellipse
            cx="100"
            cy={batteryLevel}
            rx="45"
            ry="8"
            fill="url(#chargeGlow)"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              ry: [8, 10, 8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Charging Animation */}
        {isBreak && fillLevel < 1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [batteryLevel - 5, batteryLevel - 20]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d="M 100 35 L 95 45 L 102 45 L 98 55 L 105 40 L 98 40 L 100 35"
                fill="#10b981"
                filter="url(#chargePulse)"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Low Battery Warning */}
        {fillLevel < 0.2 && fillLevel > 0 && !isBreak && (
          <motion.g
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <circle
              cx="140"
              cy="80"
              r="8"
              fill="#ef4444"
              filter="url(#batteryGlow)"
            />
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Recharging...' : 'Power Draining'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {Math.round(fillLevel * 100)}%
        </p>
      </div>
    </div>
  );
}
