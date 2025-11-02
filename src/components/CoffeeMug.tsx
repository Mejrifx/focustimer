interface CoffeeMugProps {
  fillLevel: number;
  isBreak: boolean;
}

export default function CoffeeMug({ fillLevel, isBreak }: CoffeeMugProps) {
  const fillHeight = fillLevel * 100;

  return (
    <div className="relative w-64 h-64 mx-auto">
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
            <stop offset="0%" stopColor="#6B4423" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>
        </defs>

        <path
          d="M 50 40 Q 50 35, 55 35 L 115 35 Q 120 35, 120 40 L 125 160 Q 125 170, 115 170 L 55 170 Q 50 170, 50 160 Z"
          fill="#f5f5f5"
          stroke="#8B7355"
          strokeWidth="3"
        />

        <g clipPath="url(#mugClip)">
          <rect
            x="45"
            y={170 - fillHeight * 1.35}
            width="85"
            height={fillHeight * 1.35}
            fill="url(#coffeeGradient)"
            className="transition-all duration-1000 ease-linear"
          />

          <ellipse
            cx="87.5"
            cy={170 - fillHeight * 1.35}
            rx="40"
            ry="8"
            fill="#8B6F47"
            opacity="0.6"
          />
        </g>

        <path
          d="M 125 60 Q 145 60, 145 80 Q 145 100, 125 100"
          fill="none"
          stroke="#8B7355"
          strokeWidth="3"
        />

        <ellipse
          cx="87.5"
          cy="37"
          rx="30"
          ry="6"
          fill="#e0e0e0"
          opacity="0.5"
        />
      </svg>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-gray-600">
          {isBreak ? 'Refueling...' : 'Focus Time'}
        </p>
      </div>
    </div>
  );
}
