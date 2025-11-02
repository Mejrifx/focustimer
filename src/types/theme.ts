import { LucideIcon } from 'lucide-react';
import { Coffee, Battery, Rocket, FlameKindling, Sprout, Droplet, Hourglass } from 'lucide-react';

export type ThemeType = 'coffee' | 'battery' | 'rocket' | 'candle' | 'plant' | 'water' | 'sand';

export interface Theme {
  id: ThemeType;
  name: string;
  icon: LucideIcon;
  focusColors: string;
  breakColors: string;
  focusColorsDark: string;
  breakColorsDark: string;
}

export const themes: Theme[] = [
  {
    id: 'coffee',
    name: 'Coffee Mug',
    icon: Coffee,
    focusColors: 'from-amber-50 via-orange-50 to-yellow-50',
    breakColors: 'from-blue-50 via-cyan-50 to-teal-50',
    focusColorsDark: 'from-amber-900/30 via-orange-900/30 to-yellow-900/30',
    breakColorsDark: 'from-blue-900/30 via-cyan-900/30 to-teal-900/30'
  },
  {
    id: 'battery',
    name: 'Battery Charge',
    icon: Battery,
    focusColors: 'from-gray-50 via-slate-50 to-zinc-50',
    breakColors: 'from-emerald-50 via-green-50 to-teal-50',
    focusColorsDark: 'from-gray-900/30 via-slate-900/30 to-zinc-900/30',
    breakColorsDark: 'from-emerald-900/30 via-green-900/30 to-teal-900/30'
  },
  {
    id: 'rocket',
    name: 'Rocket Fuel',
    icon: Rocket,
    focusColors: 'from-slate-50 via-gray-50 to-stone-50',
    breakColors: 'from-blue-50 via-indigo-50 to-violet-50',
    focusColorsDark: 'from-slate-900/30 via-gray-900/30 to-stone-900/30',
    breakColorsDark: 'from-blue-900/30 via-indigo-900/30 to-violet-900/30'
  },
  {
    id: 'candle',
    name: 'Candle',
    icon: FlameKindling,
    focusColors: 'from-amber-50 via-yellow-50 to-orange-50',
    breakColors: 'from-purple-50 via-pink-50 to-rose-50',
    focusColorsDark: 'from-amber-900/30 via-yellow-900/30 to-orange-900/30',
    breakColorsDark: 'from-purple-900/30 via-pink-900/30 to-rose-900/30'
  },
  {
    id: 'plant',
    name: 'Plant Growth',
    icon: Sprout,
    focusColors: 'from-lime-50 via-green-50 to-emerald-50',
    breakColors: 'from-teal-50 via-cyan-50 to-sky-50',
    focusColorsDark: 'from-lime-900/30 via-green-900/30 to-emerald-900/30',
    breakColorsDark: 'from-teal-900/30 via-cyan-900/30 to-sky-900/30'
  },
  {
    id: 'water',
    name: 'Water Glass',
    icon: Droplet,
    focusColors: 'from-cyan-50 via-sky-50 to-blue-50',
    breakColors: 'from-blue-50 via-indigo-50 to-cyan-50',
    focusColorsDark: 'from-cyan-900/30 via-sky-900/30 to-blue-900/30',
    breakColorsDark: 'from-blue-900/30 via-indigo-900/30 to-cyan-900/30'
  },
  {
    id: 'sand',
    name: 'Hourglass',
    icon: Hourglass,
    focusColors: 'from-violet-50 via-purple-50 to-fuchsia-50',
    breakColors: 'from-pink-50 via-rose-50 to-orange-50',
    focusColorsDark: 'from-violet-900/30 via-purple-900/30 to-fuchsia-900/30',
    breakColorsDark: 'from-pink-900/30 via-rose-900/30 to-orange-900/30'
  }
];
