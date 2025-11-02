import { motion } from 'framer-motion';

interface WaterGlassProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function WaterGlass({ fillLevel, isBreak }: WaterGlassProps) {
  const fillHeight = fillLevel * 100;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.5" />
          </linearGradient>

          <filter id="waterGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <clipPath id="glassClip">
            <path d="M 65 50 L 70 170 L 130 170 L 135 50 Z" />
          </clipPath>
        </defs>

        <ellipse
          cx="100"
          cy="175"
          rx="35"
          ry="6"
          fill="#3b82f6"
          opacity="0.2"
        />

        <path
          d="M 65 50 L 70 170 L 130 170 L 135 50 Z"
          fill="url(#glassGradient)"
          stroke="#6366f1"
          strokeWidth="3"
          opacity="0.6"
        />

        <g clipPath="url(#glassClip)">
          <motion.rect
            x="65"
            y={168 - fillHeight * 1.18}
            width="70"
            height={fillHeight * 1.18}
            fill="url(#waterGradient)"
            filter="url(#waterGlow)"
            className="transition-all duration-1000 ease-linear"
          />

          <motion.ellipse
            cx="100"
            cy={168 - fillHeight * 1.18}
            rx="32"
            ry="6"
            fill="#60a5fa"
            opacity="0.5"
            animate={{
              ry: [6, 7, 6],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {fillLevel > 0 && (
            <>
              <motion.ellipse
                cx="85"
                cy={160 - fillHeight * 1.18}
                rx="4"
                ry="6"
                fill="#e0f2fe"
                opacity="0.6"
                animate={{
                  cy: [160 - fillHeight * 1.18, 155 - fillHeight * 1.18, 160 - fillHeight * 1.18]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.ellipse
                cx="110"
                cy={155 - fillHeight * 1.18}
                rx="3"
                ry="5"
                fill="#e0f2fe"
                opacity="0.5"
                animate={{
                  cy: [155 - fillHeight * 1.18, 150 - fillHeight * 1.18, 155 - fillHeight * 1.18]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </>
          )}
        </g>

        <ellipse
          cx="100"
          cy="50"
          rx="35"
          ry="6"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          opacity="0.6"
        />

        <motion.path
          d="M 68 80 Q 66 85, 68 90"
          fill="none"
          stroke="#e0e7ff"
          strokeWidth="2"
          opacity="0.7"
          animate={{
            opacity: [0.5, 0.9, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />

        {isBreak && fillLevel < 1 && (
          <motion.g
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <path
              d="M 95 35 Q 95 30, 100 30 Q 105 30, 105 35 L 105 45 Q 105 48, 100 48 Q 95 48, 95 45 Z"
              fill="#60a5fa"
              opacity="0.6"
            />
          </motion.g>
        )}
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Refilling...' : 'Hydrating'}
        </p>
      </div>
    </div>
  );
}
