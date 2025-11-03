import { motion } from 'framer-motion';

interface PlantGrowthProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function PlantGrowth({ fillLevel, isBreak }: PlantGrowthProps) {
  const growthProgress = isBreak ? fillLevel : 1 - fillLevel;
  const stemHeight = 160 - growthProgress * 90; // Stem top position (from bottom 160)
  const stemBaseY = 160; // Base of stem at top of pot
  
  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="potGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <radialGradient id="flowerCenterGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>

          <radialGradient id="petalGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="40%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>

          <filter id="plantGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pot Shadow */}
        <ellipse
          cx="100"
          cy="175"
          rx="32"
          ry="5"
          fill="#000000"
          opacity="0.2"
        />

        {/* Pot Base */}
        <path
          d="M 65 160 L 75 175 L 125 175 L 135 160 Z"
          fill="url(#potGradient)"
          stroke="#78350f"
          strokeWidth="2"
        />

        {/* Pot Rim */}
        <rect
          x="70"
          y="160"
          width="60"
          height="5"
          fill="#b45309"
        />

        {/* Pot Top */}
        <ellipse
          cx="100"
          cy="160"
          rx="30"
          ry="8"
          fill="#d97706"
        />

        {/* Soil */}
        <ellipse
          cx="100"
          cy="160"
          rx="28"
          ry="5"
          fill="#92400e"
          opacity="0.8"
        />

        {growthProgress > 0.1 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              opacity: { duration: 0.5 },
            }}
          >
            {/* Stem */}
            <line
              x1="100"
              y1={stemBaseY}
              x2="100"
              y2={stemHeight}
              stroke="url(#stemGradient)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <motion.line
              x1="100"
              y1={stemBaseY}
              x2="100"
              y2={stemHeight}
              stroke="url(#stemGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                x2: isBreak ? [100, 98, 100] : 100
              }}
              transition={{
                pathLength: { duration: 1 },
                x2: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ opacity: 0 }}
            />

            {/* First set of leaves (lower) - properly attached to stem */}
            {growthProgress > 0.3 && (
              <>
                <motion.path
                  d={`M 100 ${stemBaseY - (stemBaseY - stemHeight) * 0.4} 
                      Q 75 ${stemBaseY - (stemBaseY - stemHeight) * 0.35}, 
                      70 ${stemBaseY - (stemBaseY - stemHeight) * 0.45}
                      Q 68 ${stemBaseY - (stemBaseY - stemHeight) * 0.5}, 
                      72 ${stemBaseY - (stemBaseY - stemHeight) * 0.52}
                      Q 85 ${stemBaseY - (stemBaseY - stemHeight) * 0.43}, 
                      100 ${stemBaseY - (stemBaseY - stemHeight) * 0.4} Z`}
                  fill="url(#leafGradient)"
                  stroke="#15803d"
                  strokeWidth="1"
                  initial={{ scale: 0, transformOrigin: "100px 100px" }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, 3, -3, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.3 },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />

                <motion.path
                  d={`M 100 ${stemBaseY - (stemBaseY - stemHeight) * 0.4} 
                      Q 125 ${stemBaseY - (stemBaseY - stemHeight) * 0.35}, 
                      130 ${stemBaseY - (stemBaseY - stemHeight) * 0.45}
                      Q 132 ${stemBaseY - (stemBaseY - stemHeight) * 0.5}, 
                      128 ${stemBaseY - (stemBaseY - stemHeight) * 0.52}
                      Q 115 ${stemBaseY - (stemBaseY - stemHeight) * 0.43}, 
                      100 ${stemBaseY - (stemBaseY - stemHeight) * 0.4} Z`}
                  fill="url(#leafGradient)"
                  stroke="#15803d"
                  strokeWidth="1"
                  initial={{ scale: 0, transformOrigin: "100px 100px" }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, -3, 3, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.4 },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                />
              </>
            )}

            {/* Second set of leaves (middle) - properly attached to stem */}
            {growthProgress > 0.5 && (
              <>
                <motion.path
                  d={`M 100 ${stemBaseY - (stemBaseY - stemHeight) * 0.65} 
                      Q 82 ${stemBaseY - (stemBaseY - stemHeight) * 0.6}, 
                      77 ${stemBaseY - (stemBaseY - stemHeight) * 0.7}
                      Q 75 ${stemBaseY - (stemBaseY - stemHeight) * 0.75}, 
                      79 ${stemBaseY - (stemBaseY - stemHeight) * 0.77}
                      Q 90 ${stemBaseY - (stemBaseY - stemHeight) * 0.68}, 
                      100 ${stemBaseY - (stemBaseY - stemHeight) * 0.65} Z`}
                  fill="url(#leafGradient)"
                  stroke="#15803d"
                  strokeWidth="1"
                  initial={{ scale: 0, transformOrigin: "100px 100px" }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, 2, -2, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.6 },
                    rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                  }}
                />

                <motion.path
                  d={`M 100 ${stemBaseY - (stemBaseY - stemHeight) * 0.65} 
                      Q 118 ${stemBaseY - (stemBaseY - stemHeight) * 0.6}, 
                      123 ${stemBaseY - (stemBaseY - stemHeight) * 0.7}
                      Q 125 ${stemBaseY - (stemBaseY - stemHeight) * 0.75}, 
                      121 ${stemBaseY - (stemBaseY - stemHeight) * 0.77}
                      Q 110 ${stemBaseY - (stemBaseY - stemHeight) * 0.68}, 
                      100 ${stemBaseY - (stemBaseY - stemHeight) * 0.65} Z`}
                  fill="url(#leafGradient)"
                  stroke="#15803d"
                  strokeWidth="1"
                  initial={{ scale: 0, transformOrigin: "100px 100px" }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, -2, 2, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.7 },
                    rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                  }}
                />
              </>
            )}

            {/* Flower - properly positioned at top of stem */}
            {growthProgress > 0.8 && (
              <motion.g
                style={{
                  transformOrigin: `100px ${stemHeight}px`
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: isBreak ? [0, 360] : 0
                }}
                transition={{
                  scale: { duration: 1, delay: 0.8 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              >
                {/* Flower Center */}
                <circle
                  cx="100"
                  cy={stemHeight}
                  r="10"
                  fill="url(#flowerCenterGradient)"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  filter="url(#plantGlow)"
                />

                {/* Flower Petals - properly attached to center */}
                {[0, 72, 144, 216, 288].map((angle, i) => {
                  const angleRad = (angle * Math.PI) / 180;
                  const petalX = 100 + 18 * Math.cos(angleRad);
                  const petalY = stemHeight + 18 * Math.sin(angleRad);
                  return (
                    <motion.ellipse
                      key={i}
                      cx={petalX}
                      cy={petalY}
                      rx="7"
                      ry="11"
                      fill="url(#petalGradient)"
                      filter="url(#plantGlow)"
                      opacity="0.95"
                      animate={{
                        opacity: [0.9, 1, 0.9],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </motion.g>
            )}
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Swaying Gently' : 'Growing Strong'}
        </p>
      </div>
    </div>
  );
}
