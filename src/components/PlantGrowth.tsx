import { motion } from 'framer-motion';

interface PlantGrowthProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function PlantGrowth({ fillLevel, isBreak }: PlantGrowthProps) {
  const growthProgress = isBreak ? fillLevel : 1 - fillLevel;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
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

          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <radialGradient id="flowerGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>

          <filter id="plantGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="100"
          cy="175"
          rx="30"
          ry="5"
          fill="#92400e"
          opacity="0.3"
        />

        <path
          d="M 65 160 L 75 175 L 125 175 L 135 160 Z"
          fill="url(#potGradient)"
          stroke="#78350f"
          strokeWidth="2"
        />

        <rect
          x="70"
          y="160"
          width="60"
          height="5"
          fill="#b45309"
        />

        <ellipse
          cx="100"
          cy="160"
          rx="30"
          ry="8"
          fill="#d97706"
        />

        {growthProgress > 0.1 && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: isBreak ? [0, -2, 0] : 0
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.path
              d={`M 100 160 Q 95 ${160 - growthProgress * 80}, 100 ${160 - growthProgress * 90}`}
              fill="none"
              stroke="#15803d"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />

            {growthProgress > 0.3 && (
              <>
                <motion.path
                  d={`M ${95 + growthProgress * 5} ${160 - growthProgress * 50} Q ${75 + growthProgress * 5} ${155 - growthProgress * 50}, ${70 + growthProgress * 5} ${165 - growthProgress * 50}`}
                  fill="url(#leafGradient)"
                  initial={{ scale: 0, originX: 0.9, originY: 0.5 }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, 5, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.3 },
                    rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                />

                <motion.path
                  d={`M ${105 - growthProgress * 5} ${160 - growthProgress * 50} Q ${125 - growthProgress * 5} ${155 - growthProgress * 50}, ${130 - growthProgress * 5} ${165 - growthProgress * 50}`}
                  fill="url(#leafGradient)"
                  initial={{ scale: 0, originX: 0.1, originY: 0.5 }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, -5, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.4 },
                    rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                />
              </>
            )}

            {growthProgress > 0.5 && (
              <>
                <motion.path
                  d={`M ${97 + growthProgress * 3} ${160 - growthProgress * 70} Q ${82 + growthProgress * 3} ${158 - growthProgress * 70}, ${77 + growthProgress * 3} ${168 - growthProgress * 70}`}
                  fill="url(#leafGradient)"
                  initial={{ scale: 0, originX: 0.9, originY: 0.5 }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, 4, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.6 },
                    rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                  }}
                />

                <motion.path
                  d={`M ${103 - growthProgress * 3} ${160 - growthProgress * 70} Q ${118 - growthProgress * 3} ${158 - growthProgress * 70}, ${123 - growthProgress * 3} ${168 - growthProgress * 70}`}
                  fill="url(#leafGradient)"
                  initial={{ scale: 0, originX: 0.1, originY: 0.5 }}
                  animate={{
                    scale: 1,
                    rotate: isBreak ? [0, -4, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: 0.7 },
                    rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                  }}
                />
              </>
            )}

            {growthProgress > 0.8 && (
              <motion.g
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
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <motion.ellipse
                    key={i}
                    cx={100 + 12 * Math.cos((angle * Math.PI) / 180)}
                    cy={70 - growthProgress * 90 + 12 * Math.sin((angle * Math.PI) / 180)}
                    rx="6"
                    ry="8"
                    fill="url(#flowerGradient)"
                    filter="url(#plantGlow)"
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}

                <circle
                  cx="100"
                  cy={70 - growthProgress * 90}
                  r="8"
                  fill="#fbbf24"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
              </motion.g>
            )}
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Swaying Gently' : 'Growing Strong'}
        </p>
      </div>
    </div>
  );
}
