import { motion } from 'framer-motion';

interface WaterGlassProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function WaterGlass({ fillLevel, isBreak }: WaterGlassProps) {
  const fillHeight = fillLevel * 118;
  const waterLevel = 168 - fillHeight;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#60a5fa" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="waterSurface" cx="50%" cy="0%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
          </radialGradient>

          <filter id="waterGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <clipPath id="glassClip">
            <path d="M 65 50 Q 65 48, 67 48 L 133 48 Q 135 48, 135 50 L 135 170 Q 135 172, 133 172 L 67 172 Q 65 172, 65 170 Z" />
          </clipPath>
        </defs>

        {/* Glass Shadow */}
        <ellipse
          cx="100"
          cy="180"
          rx="38"
          ry="6"
          fill="#000000"
          opacity="0.2"
        />

        {/* Glass Base */}
        <ellipse
          cx="100"
          cy="175"
          rx="36"
          ry="6"
          fill="#3b82f6"
          opacity="0.15"
        />

        {/* Glass Body */}
        <path
          d="M 65 50 Q 65 48, 67 48 L 133 48 Q 135 48, 135 50 L 135 170 Q 135 172, 133 172 L 67 172 Q 65 172, 65 170 Z"
          fill="url(#glassGradient)"
          stroke="#6366f1"
          strokeWidth="3"
          opacity="0.7"
        />

        {/* Glass Highlight */}
        <path
          d="M 68 52 L 68 168 Q 68 170, 70 170 L 85 170"
          fill="none"
          stroke="url(#glassHighlight)"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Water */}
        <g clipPath="url(#glassClip)">
          <motion.rect
            x="65"
            y={waterLevel}
            width="70"
            height={fillHeight}
            fill="url(#waterGradient)"
            filter="url(#waterGlow)"
            className="transition-all duration-1000 ease-linear"
          />

          {/* Water Surface - meniscus */}
          <motion.ellipse
            cx="100"
            cy={waterLevel}
            rx="33"
            ry="6"
            fill="url(#waterSurface)"
            opacity="0.7"
            className="transition-all duration-1000 ease-linear"
          />

          {/* Water bubbles rising */}
          {fillLevel > 0.2 && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={i}
                  cx={75 + (i % 3) * 15 + Math.sin(i) * 3}
                  cy={waterLevel + 10 + (i % 2) * 5}
                  r={1.5 + (i % 2) * 0.8}
                  fill="#e0f2fe"
                  opacity="0.5"
                  animate={{
                    cy: [waterLevel + 10 + (i % 2) * 5, waterLevel - 20, waterLevel + 10 + (i % 2) * 5],
                    opacity: [0.5, 0.8, 0.3, 0.5],
                    scale: [1, 1.2, 0.8, 1]
                  }}
                  transition={{
                    duration: 4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </>
          )}

          {/* Water ripples */}
          {fillLevel > 0.1 && (
            <motion.ellipse
              cx="100"
              cy={waterLevel + 2}
              rx="32"
              ry="3"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="1"
              opacity="0.4"
              animate={{
                ry: [3, 5, 3],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </g>

        {/* Glass Rim Top */}
        <ellipse
          cx="100"
          cy="50"
          rx="35"
          ry="6"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          opacity="0.7"
        />

        {/* Rim highlight */}
        <ellipse
          cx="100"
          cy="49"
          rx="34"
          ry="3"
          fill="#ffffff"
          opacity="0.3"
        />

        {/* Light reflection on glass */}
        <motion.path
          d="M 68 80 Q 66 85, 68 90 Q 70 95, 72 92"
          fill="none"
          stroke="url(#glassHighlight)"
          strokeWidth="2"
          opacity="0.6"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            d: [
              "M 68 80 Q 66 85, 68 90 Q 70 95, 72 92",
              "M 68 82 Q 66 87, 68 92 Q 70 97, 72 94",
              "M 68 80 Q 66 85, 68 90 Q 70 95, 72 92"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Refilling animation */}
        {isBreak && fillLevel < 1 && (
          <motion.g
            initial={{ y: -30, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <path
              d="M 95 35 Q 95 30, 100 30 Q 105 30, 105 35 L 105 45 Q 105 48, 100 48 Q 95 48, 95 45 Z"
              fill="#60a5fa"
              opacity="0.7"
            />
            {[0, 1].map((i) => (
              <motion.path
                key={i}
                d={`M ${95 + i * 10} 45 L ${95 + i * 10} 55`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  y: [0, 10, 0]
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
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Refilling...' : 'Hydrating'}
        </p>
      </div>
    </div>
  );
}
