import { motion } from 'framer-motion';

interface SandTimerProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function SandTimer({ fillLevel, isBreak }: SandTimerProps) {
  const topSand = fillLevel;
  const bottomSand = 1 - fillLevel;
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
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="glassFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <filter id="sandGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <clipPath id="topBulb">
            <path d="M 70 40 L 100 85 L 130 40 L 130 40 Q 130 35, 125 35 L 75 35 Q 70 35, 70 40 Z" />
          </clipPath>

          <clipPath id="bottomBulb">
            <path d="M 70 160 L 100 115 L 130 160 L 130 160 Q 130 165, 125 165 L 75 165 Q 70 165, 70 160 Z" />
          </clipPath>
        </defs>

        <ellipse
          cx="100"
          cy="172"
          rx="35"
          ry="5"
          fill="#6366f1"
          opacity="0.3"
        />

        <rect
          x="60"
          y="30"
          width="80"
          height="10"
          rx="2"
          fill="url(#glassFrameGradient)"
        />

        <rect
          x="60"
          y="160"
          width="80"
          height="10"
          rx="2"
          fill="url(#glassFrameGradient)"
        />

        <path
          d="M 70 40 L 100 85 L 130 40 Z"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          opacity="0.6"
        />

        <path
          d="M 70 160 L 100 115 L 130 160 Z"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          opacity="0.6"
        />

        <g clipPath="url(#topBulb)">
          <rect
            x="70"
            y={40 + (1 - topSand) * 40}
            width="60"
            height={topSand * 40}
            fill="url(#sandGradient)"
            filter="url(#sandGlow)"
            className="transition-all duration-1000 ease-linear"
          />
        </g>

        <g clipPath="url(#bottomBulb)">
          <rect
            x="70"
            y={160 - bottomSand * 40}
            width="60"
            height={bottomSand * 40}
            fill="url(#sandGradient)"
            filter="url(#sandGlow)"
            className="transition-all duration-1000 ease-linear"
          />
        </g>

        {topSand > 0.05 && (
          <motion.g>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={98 + (Math.random() - 0.5) * 3}
                cy={85}
                r={0.8 + Math.random() * 0.5}
                fill="#f59e0b"
                initial={{ cy: 85, opacity: 1 }}
                animate={{
                  cy: [85, 115],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "linear"
                }}
              />
            ))}
          </motion.g>
        )}

        <ellipse
          cx="100"
          cy={40 + (1 - topSand) * 40}
          rx="28"
          ry="3"
          fill="#d97706"
          opacity="0.6"
        />

        <ellipse
          cx="100"
          cy={160 - bottomSand * 40}
          rx="28"
          ry="3"
          fill="#d97706"
          opacity="0.6"
        />

        <motion.rect
          x="95"
          y="85"
          width="10"
          height="30"
          fill="#ddd6fe"
          opacity="0.3"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />

        <motion.path
          d="M 75 40 Q 72 42, 75 44"
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="2"
          opacity="0.5"
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        <motion.path
          d="M 125 155 Q 128 157, 125 159"
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="2"
          opacity="0.5"
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }}
        />
      </motion.svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Break Flow' : 'Time Flowing'}
        </p>
      </div>
    </div>
  );
}
