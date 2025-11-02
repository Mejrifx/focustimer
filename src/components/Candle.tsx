import { motion } from 'framer-motion';

interface CandleProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function Candle({ fillLevel, isBreak }: CandleProps) {
  const candleHeight = 80 + fillLevel * 60;
  const wickY = 170 - candleHeight;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          <radialGradient id="flameGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>

          <filter id="flameGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="waxDrip" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <ellipse
          cx="100"
          cy="175"
          rx="25"
          ry="5"
          fill="#d97706"
          opacity="0.3"
        />

        <rect
          x="75"
          y={170 - candleHeight}
          width="50"
          height={candleHeight}
          rx="3"
          fill="url(#candleGradient)"
          className="transition-all duration-1000 ease-linear"
        />

        <motion.path
          d={`M 75 ${wickY + 5} Q 73 ${wickY}, 75 ${wickY - 5} Q 77 ${wickY - 8}, 80 ${wickY - 5}`}
          fill="url(#waxDrip)"
          animate={{
            opacity: fillLevel < 0.8 ? [0.6, 0.8, 0.6] : 0
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.path
          d={`M 125 ${wickY + 5} Q 127 ${wickY}, 125 ${wickY - 5} Q 123 ${wickY - 8}, 120 ${wickY - 5}`}
          fill="url(#waxDrip)"
          animate={{
            opacity: fillLevel < 0.8 ? [0.5, 0.7, 0.5] : 0
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
        />

        <ellipse
          cx="100"
          cy={wickY}
          rx="27"
          ry="6"
          fill="#fbbf24"
          opacity="0.6"
        />

        <rect
          x="98"
          y={wickY}
          width="4"
          height="15"
          fill="#3e2723"
          rx="1"
        />

        {fillLevel > 0 && (
          <motion.g filter="url(#flameGlow)">
            <motion.ellipse
              cx="100"
              cy={wickY - 8}
              rx="12"
              ry="18"
              fill="url(#flameGradient)"
              animate={{
                ry: [18, 20, 17, 19, 18],
                rx: [12, 13, 11, 12.5, 12],
                cy: [wickY - 8, wickY - 9, wickY - 7, wickY - 8.5, wickY - 8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.ellipse
              cx="100"
              cy={wickY - 12}
              rx="8"
              ry="12"
              fill="#fef3c7"
              opacity="0.8"
              animate={{
                ry: [12, 13, 11, 12.5, 12],
                opacity: [0.8, 0.9, 0.7, 0.85, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.circle
              cx="100"
              cy={wickY - 15}
              r="3"
              fill="#fef3c7"
              animate={{
                r: [3, 4, 2.5, 3.5, 3],
                opacity: [1, 0.8, 1, 0.9, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Relighting...' : 'Burning Bright'}
        </p>
      </div>
    </div>
  );
}
