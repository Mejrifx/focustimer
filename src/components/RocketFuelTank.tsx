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

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <div className="relative">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            <linearGradient id="fuelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <radialGradient id="flameGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="30%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>

            <filter id="rocketGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="flameGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <motion.g
            initial={{ y: 0 }}
            animate={fillLevel === 0 && !isBreak ? { y: [-5, -80], opacity: [1, 0] } : { y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <path
              d="M 85 50 L 85 30 L 100 15 L 115 30 L 115 50 Z"
              fill="url(#rocketGradient)"
              stroke="#1e3a8a"
              strokeWidth="2"
            />

            <ellipse
              cx="100"
              cy="50"
              rx="15"
              ry="3"
              fill="#1e40af"
            />

            <rect
              x="70"
              y="50"
              width="60"
              height="80"
              rx="6"
              fill="#e5e7eb"
              stroke="#6b7280"
              strokeWidth="3"
            />

            <rect
              x="75"
              y={125 - fillHeight * 0.7}
              width="50"
              height={fillHeight * 0.7}
              rx="4"
              fill="url(#fuelGradient)"
              className="transition-all duration-1000 ease-linear"
            />

            <path
              d="M 70 130 L 60 150 L 70 150 Z"
              fill="#dc2626"
            />
            <path
              d="M 130 130 L 140 150 L 130 150 Z"
              fill="#dc2626"
            />
            <path
              d="M 85 130 L 80 155 L 90 155 Z"
              fill="#ef4444"
            />
            <path
              d="M 115 130 L 110 155 L 120 155 Z"
              fill="#ef4444"
            />

            <circle cx="100" cy="70" r="8" fill="#3b82f6" opacity="0.3" />
            <rect x="85" y="90" width="30" height="15" rx="2" fill="#1e40af" opacity="0.2" />
          </motion.g>

          {/* Flame paths removed - replaced with Lottie animation below */}
        </svg>

        {fillLevel > 0 && (
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{
              width: '200px',
              height: '200px',
              opacity: flameIntensity,
              marginBottom: '-80px'
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
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Refueling...' : 'Burning Fuel'}
        </p>
      </div>
    </div>
  );
}
