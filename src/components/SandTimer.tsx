import { motion } from 'framer-motion';

interface SandTimerProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function SandTimer({ fillLevel, isBreak }: SandTimerProps) {
  const topSand = fillLevel;
  const bottomSand = 1 - fillLevel;
  const topBulbHeight = 45;
  const bottomBulbHeight = 45;
  const neckY = 85;
  const topBulbTop = 40;
  const bottomBulbBottom = 160;
  const topSandLevel = topBulbTop + (1 - topSand) * topBulbHeight;
  const bottomSandLevel = bottomBulbBottom - (1 - bottomSand) * bottomBulbHeight;
  const isFlipping = fillLevel < 0.01 || fillLevel > 0.99;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        animate={isFlipping ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="glassFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="sandSurface" cx="50%" cy="0%">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </radialGradient>

          <filter id="sandGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <clipPath id="topBulb">
            <path d="M 70 40 L 100 85 L 130 40 Q 130 35, 125 35 L 75 35 Q 70 35, 70 40 Z" />
          </clipPath>

          <clipPath id="bottomBulb">
            <path d="M 70 160 L 100 115 L 130 160 Q 130 165, 125 165 L 75 165 Q 70 165, 70 160 Z" />
          </clipPath>
        </defs>

        {/* Hourglass Shadow */}
        <ellipse
          cx="100"
          cy="185"
          rx="40"
          ry="6"
          fill="#000000"
          opacity="0.2"
        />

        {/* Top Frame */}
        <rect
          x="60"
          y="30"
          width="80"
          height="12"
          rx="2"
          fill="url(#glassFrameGradient)"
          stroke="#5b21b6"
          strokeWidth="2"
        />

        {/* Bottom Frame */}
        <rect
          x="60"
          y="158"
          width="80"
          height="12"
          rx="2"
          fill="url(#glassFrameGradient)"
          stroke="#5b21b6"
          strokeWidth="2"
        />

        {/* Top Glass Bulb */}
        <path
          d="M 70 40 L 100 85 L 130 40 Q 130 35, 125 35 L 75 35 Q 70 35, 70 40 Z"
          fill="url(#glassGradient)"
          stroke="#8b5cf6"
          strokeWidth="3"
          opacity="0.6"
        />

        {/* Bottom Glass Bulb */}
        <path
          d="M 70 160 L 100 115 L 130 160 Q 130 165, 125 165 L 75 165 Q 70 165, 70 160 Z"
          fill="url(#glassGradient)"
          stroke="#8b5cf6"
          strokeWidth="3"
          opacity="0.6"
        />

        {/* Glass Neck */}
        <rect
          x="95"
          y="85"
          width="10"
          height="30"
          rx="2"
          fill="url(#glassGradient)"
          stroke="#8b5cf6"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Top Sand */}
        <g clipPath="url(#topBulb)">
          {topSand > 0 && (
            <>
              <motion.rect
                x="70"
                y={topSandLevel}
                width="60"
                height={topSand * topBulbHeight}
                fill="url(#sandGradient)"
                filter="url(#sandGlow)"
                className="transition-all duration-1000 ease-linear"
              />

              {/* Sand Surface */}
              <motion.ellipse
                cx="100"
                cy={topSandLevel}
                rx="28"
                ry="4"
                fill="url(#sandSurface)"
                className="transition-all duration-1000 ease-linear"
              />
            </>
          )}
        </g>

        {/* Bottom Sand */}
        <g clipPath="url(#bottomBulb)">
          {bottomSand > 0 && (
            <>
              <motion.rect
                x="70"
                y={bottomBulbBottom - bottomSand * bottomBulbHeight}
                width="60"
                height={bottomSand * bottomBulbHeight}
                fill="url(#sandGradient)"
                filter="url(#sandGlow)"
                className="transition-all duration-1000 ease-linear"
              />

              {/* Sand Surface */}
              <motion.ellipse
                cx="100"
                cy={bottomSandLevel}
                rx="28"
                ry="4"
                fill="url(#sandSurface)"
                className="transition-all duration-1000 ease-linear"
              />
            </>
          )}
        </g>

        {/* Sand Flow - falling grains */}
        {topSand > 0.05 && topSand < 0.95 && (
          <motion.g>
            {[...Array(12)].map((_, i) => {
              const delay = (i * 0.12) % 1.5;
              const randomX = 98 + (Math.sin(i * 0.5) * 3);
              return (
                <motion.circle
                  key={i}
                  cx={randomX}
                  cy={neckY - 5}
                  r={1 + (i % 3) * 0.3}
                  fill="#f59e0b"
                  initial={{ cy: neckY - 5, opacity: 1 }}
                  animate={{
                    cy: [neckY - 5, neckY + 25],
                    opacity: [1, 0.8, 0],
                    cx: [randomX, randomX + (Math.random() - 0.5) * 2]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: delay,
                    ease: "linear"
                  }}
                />
              );
            })}
          </motion.g>
        )}

        {/* Sand Pile in Bottom */}
        {bottomSand > 0.1 && (
          <motion.path
            d={`M 70 ${bottomSandLevel} 
                Q 72 ${bottomSandLevel + 2}, 
                75 ${bottomSandLevel + 3}
                Q 85 ${bottomSandLevel + 4}, 
                95 ${bottomSandLevel + 3}
                Q 105 ${bottomSandLevel + 4}, 
                115 ${bottomSandLevel + 3}
                Q 118 ${bottomSandLevel + 2}, 
                120 ${bottomSandLevel}
                L 130 ${bottomSandLevel}
                L 130 ${bottomBulbBottom}
                L 70 ${bottomBulbBottom} Z`}
            fill="url(#sandGradient)"
            opacity="0.9"
            filter="url(#sandGlow)"
            animate={{
              d: [
                `M 70 ${bottomSandLevel} Q 72 ${bottomSandLevel + 2}, 75 ${bottomSandLevel + 3} Q 85 ${bottomSandLevel + 4}, 95 ${bottomSandLevel + 3} Q 105 ${bottomSandLevel + 4}, 115 ${bottomSandLevel + 3} Q 118 ${bottomSandLevel + 2}, 120 ${bottomSandLevel} L 130 ${bottomSandLevel} L 130 ${bottomBulbBottom} L 70 ${bottomBulbBottom} Z`,
                `M 70 ${bottomSandLevel} Q 72 ${bottomSandLevel + 3}, 75 ${bottomSandLevel + 4} Q 85 ${bottomSandLevel + 5}, 95 ${bottomSandLevel + 4} Q 105 ${bottomSandLevel + 5}, 115 ${bottomSandLevel + 4} Q 118 ${bottomSandLevel + 3}, 120 ${bottomSandLevel} L 130 ${bottomSandLevel} L 130 ${bottomBulbBottom} L 70 ${bottomBulbBottom} Z`,
                `M 70 ${bottomSandLevel} Q 72 ${bottomSandLevel + 2}, 75 ${bottomSandLevel + 3} Q 85 ${bottomSandLevel + 4}, 95 ${bottomSandLevel + 3} Q 105 ${bottomSandLevel + 4}, 115 ${bottomSandLevel + 3} Q 118 ${bottomSandLevel + 2}, 120 ${bottomSandLevel} L 130 ${bottomSandLevel} L 130 ${bottomBulbBottom} L 70 ${bottomBulbBottom} Z`
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Glass Highlights */}
        <motion.path
          d="M 75 40 Q 72 42, 75 44"
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="2"
          opacity="0.6"
          animate={{
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.path
          d="M 125 155 Q 128 157, 125 159"
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="2"
          opacity="0.6"
          animate={{
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Center highlight on neck */}
        <motion.rect
          x="97"
          y="88"
          width="6"
          height="24"
          fill="#ffffff"
          opacity="0.2"
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Break Flow' : 'Time Flowing'}
        </p>
      </div>
    </div>
  );
}
