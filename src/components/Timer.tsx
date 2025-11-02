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
    <div className="flex flex-col items-center gap-8">
      {renderAnimation()}

      <div className="text-center">
        <div className="text-6xl font-bold tracking-wider mb-2">
          {formatTime(timeLeft)}
        </div>
        <p className="text-lg text-gray-600">
          {isBreak ? 'Break Time' : 'Focus Session'}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStartPause}
          className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors shadow-md"
        >
          {isRunning ? (
            <>
              <Pause size={20} />
              Pause
            </>
          ) : (
            <>
              <Play size={20} />
              Start
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors shadow-md"
        >
          <RotateCcw size={20} />
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
