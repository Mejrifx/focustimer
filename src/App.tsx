import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Timer from './components/Timer';
import { ThemeType, themes } from './types/theme';

function App() {
  const [focusDuration, setFocusDuration] = useState(() => {
    const saved = localStorage.getItem('focusDuration');
    return saved ? parseInt(saved) : 25;
  });

  const [breakDuration, setBreakDuration] = useState(() => {
    const saved = localStorage.getItem('breakDuration');
    return saved ? parseInt(saved) : 5;
  });

  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as ThemeType) || 'coffee';
  });

  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    localStorage.setItem('focusDuration', focusDuration.toString());
  }, [focusDuration]);

  useEffect(() => {
    localStorage.setItem('breakDuration', breakDuration.toString());
  }, [breakDuration]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleModeChange = (breakMode: boolean) => {
    setIsBreak(breakMode);
  };

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];
  const backgroundColors = isBreak ? currentTheme.breakColors : currentTheme.focusColors;

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${backgroundColors} transition-all duration-1000`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Focus Timer
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your vibe, stay focused
          </p>
        </header>

        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-gray-700 mb-3 text-center">
            Choose Your Theme
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {themes.map((t) => (
              <motion.button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === t.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{t.icon}</span>
                <span className="text-sm">{t.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <main className="mb-8">
          <Timer
            focusDuration={focusDuration}
            breakDuration={breakDuration}
            onModeChange={handleModeChange}
            theme={theme}
          />
        </main>

        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Session Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={focusDuration}
                onChange={(e) => setFocusDuration(parseInt(e.target.value) || 25)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={breakDuration}
                onChange={(e) => setBreakDuration(parseInt(e.target.value) || 5)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </motion.div>

        <footer className="text-center text-gray-600 text-sm">
          Made with {currentTheme.icon} by "@Mejrifx"
        </footer>
      </div>
    </motion.div>
  );
}

export default App;
