export type ThemeType = 'coffee' | 'battery' | 'rocket' | 'candle' | 'plant' | 'water' | 'sand';

export interface Theme {
  id: ThemeType;
  name: string;
  icon: string;
  focusColors: string;
  breakColors: string;
}

export const themes: Theme[] = [
  {
    id: 'coffee',
    name: 'Coffee Mug',
    icon: '☕',
    focusColors: 'from-amber-50 via-orange-50 to-yellow-50',
    breakColors: 'from-blue-50 via-cyan-50 to-teal-50'
  },
  {
    id: 'battery',
    name: 'Battery Charge',
    icon: '🔋',
    focusColors: 'from-gray-50 via-slate-50 to-zinc-50',
    breakColors: 'from-emerald-50 via-green-50 to-teal-50'
  },
  {
    id: 'rocket',
    name: 'Rocket Fuel',
    icon: '🚀',
    focusColors: 'from-slate-50 via-gray-50 to-stone-50',
    breakColors: 'from-blue-50 via-indigo-50 to-violet-50'
  },
  {
    id: 'candle',
    name: 'Candle',
    icon: '🕯️',
    focusColors: 'from-amber-50 via-yellow-50 to-orange-50',
    breakColors: 'from-purple-50 via-pink-50 to-rose-50'
  },
  {
    id: 'plant',
    name: 'Plant Growth',
    icon: '🌱',
    focusColors: 'from-lime-50 via-green-50 to-emerald-50',
    breakColors: 'from-teal-50 via-cyan-50 to-sky-50'
  },
  {
    id: 'water',
    name: 'Water Glass',
    icon: '💧',
    focusColors: 'from-cyan-50 via-sky-50 to-blue-50',
    breakColors: 'from-blue-50 via-indigo-50 to-cyan-50'
  },
  {
    id: 'sand',
    name: 'Hourglass',
    icon: '⏳',
    focusColors: 'from-violet-50 via-purple-50 to-fuchsia-50',
    breakColors: 'from-pink-50 via-rose-50 to-orange-50'
  }
];
