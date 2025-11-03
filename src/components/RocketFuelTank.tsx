import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import rocketFlameAnimation from '../assets/rocketFlame.json';

interface RocketFuelTankProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function RocketFuelTank({ fillLevel, isBreak }: RocketFuelTankProps) {
  const fillHeight = fillLevel * 100;
  const flameIntensity = fillLevel > 0 ? 0.3 + (fillLevel * 0.7) : 0;
  const fuelLevel = 130 - fillHeight * 0.7;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto flex items-center justify-center">
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            <linearGradient id="rocketNoseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <linearGradient id="fuelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="30%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <radialGradient id="fuelSurface" cx="50%" cy="0%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
          </radialGradient>

            <linearGradient id="tankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f9fafb" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>

            <filter id="rocketGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="fuelGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Rocket Shadow */}
          <ellipse
            cx="100"
            cy="175"
            rx="40"
            ry="5"
            fill="#000000"
            opacity="0.2"
          />

          <motion.g
            initial={{ y: 0 }}
            animate={fillLevel === 0 && !isBreak ? { 
              y: [-5, -80], 
              opacity: [1, 0] 
            } : { 
              y: 0, 
              opacity: 1 
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Rocket Nose Cone */}
            <path
              d="M 85 50 L 85 35 L 100 15 L 115 35 L 115 50 Z"
              fill="url(#rocketNoseGradient)"
              stroke="#1e3a8a"
              strokeWidth="2"
              filter="url(#rocketGlow)"
            />

            {/* Nose Cone Highlight */}
            <path
              d="M 90 40 L 100 20 L 110 40"
              fill="#ffffff"
              opacity="0.4"
            />

            {/* Nose Cone Ring */}
            <ellipse
              cx="100"
              cy="50"
              rx="15"
              ry="3"
              fill="#1e40af"
              opacity="0.8"
            />

            {/* Fuel Tank Body */}
            <rect
              x="70"
              y="50"
              width="60"
              height="80"
              rx="6"
              ry="6"
              fill="url(#tankGradient)"
              stroke="#9ca3af"
              strokeWidth="3"
            />

            {/* Tank Horizontal Bands */}
            <line
              x1="72"
              y1="70"
              x2="128"
              y2="70"
              stroke="#cbd5e1"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="72"
              y1="90"
              x2="128"
              y2="90"
              stroke="#cbd5e1"
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="72"
              y1="110"
              x2="128"
              y2="110"
              stroke="#cbd5e1"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Fuel Level Indicator Lines */}
            <g opacity="0.4">
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="74"
                  y1={52 + (i + 1) * 16}
                  x2="126"
                  y2={52 + (i + 1) * 16}
                  stroke="#9ca3af"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                />
              ))}
            </g>

            {/* Fuel Fill */}
            <motion.rect
              x="75"
              y={fuelLevel}
              width="50"
              height={fillHeight * 0.7}
              rx="4"
              fill="url(#fuelGradient)"
              filter={flameIntensity > 0.5 ? "url(#fuelGlow)" : "none"}
              className="transition-all duration-1000 ease-linear"
            />

            {/* Fuel Surface */}
            {fillLevel > 0 && (
              <motion.ellipse
                cx="100"
                cy={fuelLevel}
                rx="24"
                ry="3"
                fill="url(#fuelSurface)"
                opacity="0.7"
                className="transition-all duration-1000 ease-linear"
              />
            )}

            {/* Rocket Fins */}
            <path
              d="M 70 130 L 60 150 L 70 150 Z"
              fill="#dc2626"
              stroke="#991b1b"
              strokeWidth="1.5"
            />
            <path
              d="M 130 130 L 140 150 L 130 150 Z"
              fill="#dc2626"
              stroke="#991b1b"
              strokeWidth="1.5"
            />
            <path
              d="M 85 130 L 80 155 L 90 155 Z"
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth="1"
            />
            <path
              d="M 115 130 L 110 155 L 120 155 Z"
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth="1"
            />

            {/* Rocket Windows/Details */}
            <circle 
              cx="100" 
              cy="70" 
              r="8" 
              fill="#3b82f6" 
              opacity="0.3"
              stroke="#1e40af"
              strokeWidth="1.5"
            />
            <circle 
              cx="100" 
              cy="70" 
              r="5" 
              fill="#ffffff" 
              opacity="0.5"
            />

            {/* Rocket Panel */}
            <rect 
              x="85" 
              y="90" 
              width="30" 
              height="15" 
              rx="2" 
              fill="#1e40af" 
              opacity="0.2"
              stroke="#1e3a8a"
              strokeWidth="1"
            />
            <line
              x1="88"
              y1="93"
              x2="112"
              y2="93"
              stroke="#1e3a8a"
              strokeWidth="0.5"
              opacity="0.5"
            />
            <line
              x1="88"
              y1="97"
              x2="112"
              y2="97"
              stroke="#1e3a8a"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </motion.g>

          {/* Fuel Level Low Warning */}
          {fillLevel < 0.3 && fillLevel > 0 && !isBreak && (
            <motion.g
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <circle
                cx="140"
                cy="80"
                r="6"
                fill="#ef4444"
                filter="url(#rocketGlow)"
              />
            </motion.g>
          )}
        </svg>

        {/* Lottie Flame Animation */}
        {fillLevel > 0 && (
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{
              width: '280px',
              height: '280px',
              opacity: flameIntensity,
              marginBottom: '-100px'
            }}
            animate={{ opacity: flameIntensity }}
            transition={{ duration: 0.5 }}
          >
            <Lottie
              animationData={rocketFlameAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>
        )}
      </div>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {isBreak ? 'Refueling...' : 'Burning Fuel'}
        </p>
      </div>
    </div>
  );
}
