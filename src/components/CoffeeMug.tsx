import { motion } from 'framer-motion';

interface CoffeeMugProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function CoffeeMug({ fillLevel, isBreak }: CoffeeMugProps) {
  const fillHeight = fillLevel * 120;
  const coffeeLevel = 170 - fillHeight;
  const steamLevel = coffeeLevel - 10;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="mugClip">
            <path d="M 50 40 Q 50 35, 55 35 L 115 35 Q 120 35, 120 40 L 125 160 Q 125 170, 115 170 L 55 170 Q 50 170, 50 160 Z" />
          </clipPath>
          
          <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="30%" stopColor="#6B4423" />
            <stop offset="70%" stopColor="#5C4033" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>

          <linearGradient id="mugGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f9fafb" />
            <stop offset="50%" stopColor="#f5f5f5" />
            <stop offset="100%" stopColor="#e5e5e5" />
          </linearGradient>

          <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>

          <radialGradient id="coffeeFoam" cx="50%" cy="0%">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B4513" stopOpacity="0.3" />
          </radialGradient>

          <filter id="coffeeGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Mug Shadow */}
        <ellipse
          cx="100"
          cy="175"
          rx="42"
          ry="6"
          fill="#000000"
          opacity="0.15"
        />

        {/* Mug Body */}
        <path
          d="M 50 40 Q 50 35, 55 35 L 115 35 Q 120 35, 120 40 L 125 160 Q 125 170, 115 170 L 55 170 Q 50 170, 50 160 Z"
          fill="url(#mugGradient)"
          stroke="#9ca3af"
          strokeWidth="3"
        />

        {/* Handle */}
        <path
          d="M 125 60 Q 145 55, 145 75 Q 145 95, 135 100 Q 130 102, 128 98 Q 125 95, 125 90 Q 125 85, 128 82 Q 132 78, 135 80 Q 138 82, 140 85"
          fill="none"
          stroke="url(#handleGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 125 100 Q 130 102, 128 98"
          fill="none"
          stroke="url(#handleGradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Coffee Liquid */}
        <g clipPath="url(#mugClip)">
          <motion.rect
            x="45"
            y={coffeeLevel}
            width="85"
            height={fillHeight}
            fill="url(#coffeeGradient)"
            filter="url(#coffeeGlow)"
            className="transition-all duration-1000 ease-linear"
          />

          {/* Coffee Surface - meniscus effect */}
          <motion.ellipse
            cx="87.5"
            cy={coffeeLevel}
            rx="40"
            ry="6"
            fill="url(#coffeeGradient)"
            opacity="0.9"
            className="transition-all duration-1000 ease-linear"
          />

          {/* Foam/Froth on top */}
          {fillLevel > 0.1 && (
            <motion.ellipse
              cx="87.5"
              cy={coffeeLevel}
              rx="38"
              ry="4"
              fill="url(#coffeeFoam)"
              opacity="0.6"
              animate={{
                ry: [4, 5, 4],
                opacity: [0.6, 0.7, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Coffee bubbles */}
          {fillLevel > 0.2 && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={i}
                  cx={75 + i * 8}
                  cy={coffeeLevel + 5 + (i % 2) * 3}
                  r={1.5 + (i % 2) * 0.5}
                  fill="#D4A574"
                  opacity="0.4"
                  animate={{
                    cy: [coffeeLevel + 5 + (i % 2) * 3, coffeeLevel + 10 + (i % 2) * 3, coffeeLevel + 5 + (i % 2) * 3],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </g>

        {/* Mug Rim Highlight */}
        <ellipse
          cx="87.5"
          cy="37"
          rx="32"
          ry="4"
          fill="#ffffff"
          opacity="0.4"
        />

        {/* Steam */}
        {fillLevel > 0.3 && !isBreak && (
          <motion.g opacity="0.6">
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M ${82 + i * 11} ${steamLevel} 
                    Q ${80 + i * 11} ${steamLevel - 15}, 
                    ${82 + i * 11} ${steamLevel - 30}
                    Q ${84 + i * 11} ${steamLevel - 45}, 
                    ${82 + i * 11} ${steamLevel - 60}`}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                  y: [-5, -10, -5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Inner rim shadow */}
        <ellipse
          cx="87.5"
          cy="40"
          rx="38"
          ry="2"
          fill="#000000"
          opacity="0.1"
        />
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Refueling...' : 'Focus Time'}
        </p>
      </div>
    </div>
  );
}
