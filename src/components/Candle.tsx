import { motion } from 'framer-motion';

interface CandleProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function Candle({ fillLevel, isBreak }: CandleProps) {
  const candleHeight = 80 + fillLevel * 60;
  const wickY = 170 - candleHeight;
  const waxTopY = 170 - candleHeight;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef9e7" />
            <stop offset="30%" stopColor="#fef3c7" />
            <stop offset="60%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          <radialGradient id="flameGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fef3c7" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>

          <linearGradient id="waxDripGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>

          <filter id="flameGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="waxGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Candle Shadow */}
        <ellipse
          cx="100"
          cy="175"
          rx="28"
          ry="5"
          fill="#000000"
          opacity="0.25"
        />

        {/* Candle Holder */}
        <ellipse
          cx="100"
          cy="175"
          rx="27"
          ry="6"
          fill="#d97706"
          opacity="0.4"
        />

        {/* Candle Body */}
        <motion.rect
          x="75"
          y={waxTopY}
          width="50"
          height={candleHeight}
          rx="4"
          ry="4"
          fill="url(#candleGradient)"
          stroke="#fbbf24"
          strokeWidth="1.5"
          className="transition-all duration-1000 ease-linear"
        />

        {/* Candle Top Rim */}
        <motion.ellipse
          cx="100"
          cy={waxTopY}
          rx="27"
          ry="6"
          fill="#fbbf24"
          opacity="0.7"
          className="transition-all duration-1000 ease-linear"
        />

        {/* Wick */}
        <motion.rect
          x="98"
          y={waxTopY}
          width="4"
          height={Math.max(15, candleHeight * 0.15)}
          rx="1.5"
          fill="#3e2723"
          className="transition-all duration-1000 ease-linear"
        />

        {/* Wax Drips - left side */}
        {fillLevel < 0.9 && (
          <>
            <motion.path
              d={`M 75 ${waxTopY + candleHeight * 0.3} 
                  Q 72 ${waxTopY + candleHeight * 0.35}, 
                  74 ${waxTopY + candleHeight * 0.4}
                  Q 76 ${waxTopY + candleHeight * 0.45}, 
                  75 ${waxTopY + candleHeight * 0.5}
                  Q 73 ${waxTopY + candleHeight * 0.55}, 
                  76 ${waxTopY + candleHeight * 0.6}`}
              fill="url(#waxDripGradient)"
              filter="url(#waxGlow)"
              opacity="0.8"
              animate={{
                opacity: [0.6, 0.85, 0.6],
                pathLength: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Wax Drips - right side */}
            <motion.path
              d={`M 125 ${waxTopY + candleHeight * 0.25} 
                  Q 128 ${waxTopY + candleHeight * 0.3}, 
                  126 ${waxTopY + candleHeight * 0.35}
                  Q 124 ${waxTopY + candleHeight * 0.4}, 
                  125 ${waxTopY + candleHeight * 0.45}
                  Q 127 ${waxTopY + candleHeight * 0.5}, 
                  124 ${waxTopY + candleHeight * 0.55}`}
              fill="url(#waxDripGradient)"
              filter="url(#waxGlow)"
              opacity="0.75"
              animate={{
                opacity: [0.55, 0.8, 0.55],
                pathLength: [0.65, 1, 0.65]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Small drip - left */}
            <motion.path
              d={`M 77 ${waxTopY + candleHeight * 0.65} 
                  Q 75 ${waxTopY + candleHeight * 0.7}, 
                  78 ${waxTopY + candleHeight * 0.75}`}
              fill="url(#waxDripGradient)"
              opacity="0.7"
              animate={{
                opacity: [0.5, 0.75, 0.5],
                y: [0, 2, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </>
        )}

        {/* Flame */}
        {fillLevel > 0 && (
          <motion.g filter="url(#flameGlow)">
            {/* Outer flame */}
            <motion.ellipse
              cx="100"
              cy={wickY - 10}
              rx="14"
              ry="22"
              fill="url(#flameGradient)"
              animate={{
                ry: [22, 25, 20, 24, 22],
                rx: [14, 16, 13, 15, 14],
                cy: [wickY - 10, wickY - 11, wickY - 9, wickY - 10.5, wickY - 10]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Middle flame */}
            <motion.ellipse
              cx="100"
              cy={wickY - 8}
              rx="10"
              ry="16"
              fill="#fbbf24"
              opacity="0.95"
              animate={{
                ry: [16, 18, 15, 17, 16],
                rx: [10, 11, 9, 10.5, 10],
                opacity: [0.9, 1, 0.85, 0.95, 0.9]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />

            {/* Inner bright core */}
            <motion.ellipse
              cx="100"
              cy={wickY - 6}
              rx="6"
              ry="12"
              fill="#fef3c7"
              opacity="0.98"
              animate={{
                ry: [12, 13, 11, 12.5, 12],
                opacity: [0.95, 1, 0.9, 0.98, 0.95]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Brightest center */}
            <motion.circle
              cx="100"
              cy={wickY - 4}
              r="4"
              fill="#ffffff"
              opacity="0.9"
              animate={{
                r: [4, 5, 3.5, 4.5, 4],
                opacity: [0.85, 1, 0.8, 0.95, 0.85]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Sparkle particles */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={100 + (i - 1) * 8}
                cy={wickY - 20 - i * 3}
                r="1"
                fill="#fef3c7"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Relighting...' : 'Burning Bright'}
        </p>
      </div>
    </div>
  );
}
