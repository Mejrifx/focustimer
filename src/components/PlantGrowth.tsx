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
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="30%" stopColor="#92400e" />
            <stop offset="60%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>

          <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="30%" stopColor="#fde68a" />
            <stop offset="70%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <radialGradient id="petalHighlight" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
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
            {/* Stem - always visible */}
            <line
              x1="100"
              y1={stemBaseY}
              x2="100"
              y2={stemHeight}
              stroke="url(#stemGradient)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Stem growth animation overlay */}
            <motion.path
              d={`M 100 ${stemBaseY} L 100 ${stemHeight}`}
              fill="none"
              stroke="url(#stemGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1
              }}
              transition={{
                pathLength: { duration: 1 }
              }}
              style={{ opacity: 0.5 }}
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

            {/* Flower - realistic sunflower/daisy style */}
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
                {/* Outer Petals - Large petals arranged in a circle */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                  const angleRad = (angle * Math.PI) / 180;
                  const petalCenterX = 100 + 28 * Math.cos(angleRad);
                  const petalCenterY = stemHeight + 28 * Math.sin(angleRad);
                  const petalRotation = angle;
                  
                  return (
                    <motion.path
                      key={`outer-${i}`}
                      d={`M ${petalCenterX} ${petalCenterY} 
                          Q ${petalCenterX - 10 * Math.cos(angleRad - 0.5)} ${petalCenterY - 10 * Math.sin(angleRad - 0.5)}, 
                          ${petalCenterX - 5} ${petalCenterY - 18}
                          Q ${petalCenterX - 2} ${petalCenterY - 25}, 
                          ${petalCenterX + 2} ${petalCenterY - 25}
                          Q ${petalCenterX + 5} ${petalCenterY - 18}, 
                          ${petalCenterX + 10 * Math.cos(angleRad + 0.5)} ${petalCenterY - 10 * Math.sin(angleRad + 0.5)}
                          Q ${petalCenterX + 8} ${petalCenterY - 2}, 
                          ${petalCenterX} ${petalCenterY} Z`}
                      fill="url(#petalGradient)"
                      stroke="#f59e0b"
                      strokeWidth="0.8"
                      transform={`rotate(${petalRotation} ${petalCenterX} ${petalCenterY})`}
                      filter="url(#plantGlow)"
                      opacity="0.95"
                      animate={{
                        opacity: [0.9, 1, 0.9],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}

                {/* Inner Petals - Smaller petals in between */}
                {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => {
                  const angleRad = (angle * Math.PI) / 180;
                  const petalCenterX = 100 + 20 * Math.cos(angleRad);
                  const petalCenterY = stemHeight + 20 * Math.sin(angleRad);
                  const petalRotation = angle;
                  
                  return (
                    <motion.path
                      key={`inner-${i}`}
                      d={`M ${petalCenterX} ${petalCenterY} 
                          Q ${petalCenterX - 7 * Math.cos(angleRad - 0.5)} ${petalCenterY - 7 * Math.sin(angleRad - 0.5)}, 
                          ${petalCenterX - 3} ${petalCenterY - 12}
                          Q ${petalCenterX - 1} ${petalCenterY - 18}, 
                          ${petalCenterX + 1} ${petalCenterY - 18}
                          Q ${petalCenterX + 3} ${petalCenterY - 12}, 
                          ${petalCenterX + 7 * Math.cos(angleRad + 0.5)} ${petalCenterY - 7 * Math.sin(angleRad + 0.5)}
                          Q ${petalCenterX + 5} ${petalCenterY - 1}, 
                          ${petalCenterX} ${petalCenterY} Z`}
                      fill="url(#petalGradient)"
                      stroke="#fbbf24"
                      strokeWidth="0.6"
                      transform={`rotate(${petalRotation} ${petalCenterX} ${petalCenterY})`}
                      opacity="0.9"
                      animate={{
                        opacity: [0.85, 0.95, 0.85],
                        scale: [1, 1.03, 1]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.12,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}

                {/* Flower Center - Dark brown center like a sunflower */}
                <circle
                  cx="100"
                  cy={stemHeight}
                  r="12"
                  fill="url(#flowerCenterGradient)"
                  stroke="#78350f"
                  strokeWidth="2"
                  filter="url(#plantGlow)"
                />
                {/* Center texture dots */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const angleRad = (angle * Math.PI) / 180;
                  return (
                    <circle
                      key={`dot-${i}`}
                      cx={100 + 4 * Math.cos(angleRad)}
                      cy={stemHeight + 4 * Math.sin(angleRad)}
                      r="1.5"
                      fill="#78350f"
                      opacity="0.7"
                    />
                  );
                })}
                <circle
                  cx="100"
                  cy={stemHeight}
                  r="4"
                  fill="#92400e"
                  opacity="0.8"
                />
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
