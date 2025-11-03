import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import CoffeeMug from './CoffeeMug';
import BatteryCharge from './BatteryCharge';
import RocketFuelTank from './RocketFuelTank';
import Candle from './Candle';
import PlantGrowth from './PlantGrowth';
import WaterGlass from './WaterGlass';
import SandTimer from './SandTimer';
import { ThemeType } from '../types/theme';

interface TimerProps {
  focusDuration: number;
  breakDuration: number;
  onModeChange: (isBreak: boolean) => void;
  theme: ThemeType;
}

export default function Timer({ focusDuration, breakDuration, onModeChange, theme }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playChime();
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          onModeChange(nextIsBreak);
          return nextIsBreak ? breakDuration * 60 : focusDuration * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak, focusDuration, breakDuration, onModeChange]);

  useEffect(() => {
    setTimeLeft(isBreak ? breakDuration * 60 : focusDuration * 60);
  }, [focusDuration, breakDuration, isBreak]);

  const playChime = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(focusDuration * 60);
    onModeChange(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = isBreak ? breakDuration * 60 : focusDuration * 60;
  const fillLevel = isBreak ? 1 - timeLeft / totalDuration : timeLeft / totalDuration;

  const renderAnimation = () => {
    const props = { fillLevel, isBreak };
    switch (theme) {
      case 'coffee':
        return <CoffeeMug {...props} />;
      case 'battery':
        return <BatteryCharge {...props} />;
      case 'rocket':
        return <RocketFuelTank {...props} />;
      case 'candle':
        return <Candle {...props} />;
      case 'plant':
        return <PlantGrowth {...props} />;
      case 'water':
        return <WaterGlass {...props} />;
      case 'sand':
        return <SandTimer {...props} />;
      default:
        return <CoffeeMug {...props} />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 md:gap-12">
      {renderAnimation()}

      <div className="text-center">
        <div className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-4 text-gray-800 dark:text-gray-100">
          {formatTime(timeLeft)}
        </div>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
          {isBreak ? 'Break Time' : 'Focus Session'}
        </p>
      </div>

      <div className="flex gap-4 md:gap-6">
        <button
          onClick={handleStartPause}
          className="flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white rounded-xl font-semibold text-lg md:text-xl transition-colors shadow-lg"
        >
          {isRunning ? (
            <>
              <Pause size={24} />
              Pause
            </>
          ) : (
            <>
              <Play size={24} />
              Start
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl font-semibold text-lg md:text-xl transition-colors shadow-lg"
        >
          <RotateCcw size={24} />
          Reset
        </button>
      </div>

      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPwoUYLnq7KZSEQxJo+TxtGwhBjeR1fLMeisFKIHN8diJNwgZaLvt559NEAxPp+PxtWMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPwoUYLnq7KZSEQxJo+TxtGwhBjeR1fLMeisFKIHN8diJNwgZaLvt559NEAxPp+PxtWMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPwoUYLnq7KZSEQxJo+TxtGwhBjeR1fLMeisFKIHN8diJNwgZaLvt559NEAxPp+PxtWMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPwoUYLnq7KZSEQxJo+TxtGwhBjeR1fLMeisFKIHN8diJNwgZaLvt559NEAxPp+PxtWMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPwoUYLnq7KZSEQxJo+TxtGwhBjeR1fLMeisFKIHN8diJNwgZaLvt559NEAxPp+PxtWMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPwoUYLnq7KZSEQxJo+TxtGwhBjeR1fLMeisFKIHN8diJNwgZaLvt559NEAxPp+PxtWMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjWM0fHLfC8GKH3M8deOPw=="
      />
    </div>
  );
}
