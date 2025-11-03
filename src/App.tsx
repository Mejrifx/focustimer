import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
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

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? saved === 'true' : true; // Default to dark mode
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

  useEffect(() => {
    localStorage.setItem('darkMode', isDark.toString());
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleModeChange = (breakMode: boolean) => {
    setIsBreak(breakMode);
  };

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];
  const backgroundColors = isDark
    ? (isBreak ? currentTheme.breakColorsDark : currentTheme.focusColorsDark)
    : (isBreak ? currentTheme.breakColors : currentTheme.focusColors);
  const IconComponent = currentTheme.icon;

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${backgroundColors} transition-all duration-1000 dark:bg-gray-900`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Focus Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            Choose your vibe, stay focused
          </p>
        </header>

        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6 md:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
            Choose Your Theme
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {themes.map((t) => {
              const ThemeIcon = t.icon;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    theme === t.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThemeIcon size={20} />
                  <span className="text-sm">{t.name}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <main className="mb-8 -mt-4">
          <Timer
            focusDuration={focusDuration}
            breakDuration={breakDuration}
            onModeChange={handleModeChange}
            theme={theme}
          />
        </main>

        <motion.div
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Session Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Focus Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={focusDuration}
                onChange={(e) => setFocusDuration(parseInt(e.target.value) || 25)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={breakDuration}
                onChange={(e) => setBreakDuration(parseInt(e.target.value) || 5)}
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </motion.div>

        <footer className="text-center text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
          Made with <IconComponent size={16} className="inline" /> by "@Mejrifx"
        </footer>
      </div>
    </motion.div>
  );
}

export default App;
